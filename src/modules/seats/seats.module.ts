import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeatEntity } from './entities/seat.entity';
import { SeatService } from './seats.service';

@Module({
  imports: [TypeOrmModule.forFeature([SeatEntity])],
  controllers: [],
  exports: [SeatService],
  providers: [SeatService],
})
export class SeatsModule {}
