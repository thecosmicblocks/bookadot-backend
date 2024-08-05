import { IsNotEmpty, IsString } from 'class-validator';
import { CHAIN_TYPE } from 'src/constants';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  chainType: CHAIN_TYPE;

  @IsString()
  @IsNotEmpty()
  signature: string;
}
