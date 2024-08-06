import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { GetNonceDto } from './dtos/get-nonce.dto';
import * as crypto from 'crypto';
import { SignupDto } from './dtos/sign-up.dto';
import { CHAIN_TYPE } from 'src/constants';
import { bufferToHex } from 'ethereumjs-util';
import { recoverPersonalSignature } from '@metamask/eth-sig-util';
import * as bs58 from 'bs58';
import * as nacl from 'tweetnacl';
import { getAddress } from 'src/ethers/lib/utils';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  static verifySignature(
    msg: string,
    signature: string,
    signer: string,
    chainType: CHAIN_TYPE,
  ) {
    let isInvalidSigner = true;
    switch (chainType) {
      case CHAIN_TYPE.EVM:
        const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
        const address = recoverPersonalSignature({
          data: msgBufferHex,
          signature: signature,
        });
        // The signature verification is successful if the address found with
        // sigUtil.recoverPersonalSignature matches the initial publicAddress

        if (getAddress(address) === getAddress(signer)) isInvalidSigner = false;
        break;
      case CHAIN_TYPE.SOLANA:
        isInvalidSigner = nacl.sign.detached.verify(
          new TextEncoder().encode(msg),
          bs58.default.decode(signature),
          bs58.default.decode(signer),
        );
        break;
      default:
        break;
    }

    if (isInvalidSigner)
      throw new BadRequestException({
        message: 'Signature verification failed',
      });
  }

  async getNonce(query: GetNonceDto): Promise<0 | 1> {
    const user = await this.userService.findUserByWallet(
      query.chainType === CHAIN_TYPE.EVM
        ? getAddress(query.address)
        : query.address,
    );

    if (!user) {
      return 0;
    } else {
      user.nonce = crypto.randomBytes(12).toString('hex');
      await this.userService.updateNonce(user);
      return 1;
    }
  }

  public async registerByWallet(params: SignupDto): Promise<boolean> {
    const msg = `GoSwapShop wants you to sign a message to login\n----------------------\nNonce: ${0}`;
    AuthService.verifySignature(
      msg,
      params.signature,
      params.address,
      params.chainType,
    );

    await this.userService.signup(params);
    return true;
  }
}
