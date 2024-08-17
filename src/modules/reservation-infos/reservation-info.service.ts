import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, Like } from 'typeorm';

import { ReservationInfoEntity } from './entities/reservation-info.entity';

@Injectable()
export class ReservationInfoService {
  constructor(
    @InjectRepository(ReservationInfoEntity)
    private reservationInfoRepository: Repository<ReservationInfoEntity>,
    private dataSource: DataSource,
  ) {}

  async create(data: any): Promise<any> {
    return await this.reservationInfoRepository.save(data);
  }

  async truncate(): Promise<void> {
    const tableName = this.reservationInfoRepository.metadata.tableName;

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
