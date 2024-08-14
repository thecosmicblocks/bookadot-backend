import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeatEntity } from './entities/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SeatEntity])],
  controllers: [],
  exports: [],
  providers: [],
})
export class SeatsModule {}
