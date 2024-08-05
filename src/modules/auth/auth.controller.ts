import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CHAIN_TYPE } from 'src/constants';
import { SuccessResponseDto } from '../movies/dtos/response.dto';
import { SignupDto } from './dtos/sign-up.dto';

@Controller('auth')
@ApiTags('authentications')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/nonce')
  @ApiOperation({ summary: 'Get nonce' })
  @HttpCode(HttpStatus.OK)
  async getNonce(
    @Param('address') address: string,
    @Param('chainType') chainType: CHAIN_TYPE,
  ): Promise<SuccessResponseDto> {
    const data = await this.authService.getNonce({
      address,
      chainType,
    });
    return new SuccessResponseDto(data);
  }

  @Post('/register-by-wallet')
  @ApiOperation({ summary: 'Register user' })
  async registerByWallet(
    @Body() params: SignupDto,
  ): Promise<SuccessResponseDto> {
    const data = await this.authService.registerByWallet(params);
    return new SuccessResponseDto(data);
  }
}
