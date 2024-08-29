import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeatEntity } from './entities/seat.entity';
import { SeatService } from './seats.service';
import { TheatresModule } from '../theatres/theatres.module';

@Module({
  imports: [TypeOrmModule.forFeature([SeatEntity]), TheatresModule],
  controllers: [],
  exports: [SeatService],
  providers: [SeatService],
})
export class SeatsModule {}
