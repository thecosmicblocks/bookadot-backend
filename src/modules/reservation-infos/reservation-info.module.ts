import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReservationInfoEntity } from './entities/reservation-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationInfoEntity])],
  controllers: [],
  exports: [],
  providers: [],
})
export class ReservationInfoModule {}
