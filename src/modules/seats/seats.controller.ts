import { Controller, HttpCode, HttpStatus, Body, Post } from '@nestjs/common';

import { SeatEntity } from './entities/seat.entity';
import { SeatService } from './seat.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SeedDto } from './dtos/seed.dto';

@Controller('seats')
@ApiTags('Seat')
export class SeatsController {
  constructor(private seatService: SeatService) {}

  @Post('seed')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Seed data' })
  async seed(@Body() body: SeedDto): Promise<SeatEntity[]> {
    return this.seatService.seed(body.id);
  }
}
