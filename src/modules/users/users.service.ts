import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from '../auth/dtos/sign-up.dto';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async updateNonce(user: UserEntity) {
    return await this.userRepository.update(user.id, user);
  }

  async findUserByWallet(address: string) {
    return await this.userRepository.findOne({ where: { address } });
  }

  async signup(params: SignupDto) {
    const user = await this.userRepository.findOne({
      where: { address: params.address },
    });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const newUser = this.userRepository.create();
    newUser.address = params.address;
    newUser.chainType = params.chainType;
    newUser.nonce = crypto.randomBytes(12).toString('hex');
    await this.userRepository.save(newUser);
  }
}
