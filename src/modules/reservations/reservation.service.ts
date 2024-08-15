import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, Like } from 'typeorm';
import { ReservationInfoService } from '../reservation-infos/reservation-info.service';

import { ReservationEntity } from './entities/reservation.entity';
import { ReservationInfoEntity } from '../reservation-infos/entities/reservation-info.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private reservationRepository: Repository<ReservationEntity>,
    private dataSource: DataSource,
  ) {}

  async storeTicketPurchase(
    sessionId: string,
    ticketInfos: any[],
    totalPrice: number
  ): Promise<ReservationEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const insertReservationData = {
        userId: '291fb67f-1ddd-4f53-b9db-baab44b15c18',
        totalPrice: totalPrice,
      };
      const reservation = await queryRunner.manager.save(ReservationEntity, insertReservationData);

      const insertData = new ReservationInfoEntity();

      for (const element of ticketInfos) {
        insertData.reservationId = reservation.id;
        insertData.sessionId = sessionId;
        insertData.seatId = element.seatId;
        insertData.ticketId = element.ticketId;
      }
      await queryRunner.manager.insert(ReservationInfoEntity, insertData);

      await queryRunner.commitTransaction();

      return reservation;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException('Failed to store ticket purchase: (' + error.message + ')');
    } finally {
      await queryRunner.release();
    }
  }

  async truncate(): Promise<void> {
    const tableName = this.reservationRepository.metadata.tableName;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();
    try {
      await queryRunner.query(
        `TRUNCATE TABLE ${tableName} RESTART IDENTITY CASCADE`,
      );
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(`Error truncating ${tableName} table: ${error.message}`);
      throw new InternalServerErrorException('Internal Server Error');
    } finally {
      await queryRunner.release();
    }
  }
}
