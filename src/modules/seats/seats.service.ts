import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, Like } from 'typeorm';

import { SeatEntity } from './entities/seat.entity';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(SeatEntity)
    private seatRepository: Repository<SeatEntity>,
    private dataSource: DataSource,
  ) {}


  async create(data: any): Promise<SeatEntity> {
    return await this.seatRepository.save(data);
  }

  async truncate(): Promise<void> {
    const tableName = this.seatRepository.metadata.tableName;

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
