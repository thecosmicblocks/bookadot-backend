import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReservationEntity } from './entities/reservation.entity';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { ReservationInfoEntity } from '../reservation-infos/entities/reservation-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationEntity, ReservationInfoEntity])],
  controllers: [ReservationController],
  exports: [ReservationService],
  providers: [ReservationService],
})
export class ReservationModule {}
