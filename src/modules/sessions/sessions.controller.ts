import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('sessions')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Post('seed')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Seed sessions' })
  async seed(): Promise<void> {
    await this.sessionsService.seed();
  }
}
