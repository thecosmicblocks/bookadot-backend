import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CHAIN_TYPE } from 'src/constants';

export class SignupDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  chainType: CHAIN_TYPE;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  signature: string;
}
