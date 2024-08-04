import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TheatreEntity } from './theatre.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateTheatreDto } from './dtos/create-theatre.dto';

@Injectable()
export class TheatresService {
  constructor(
    @InjectRepository(TheatreEntity)
    private readonly theatreRepository: Repository<TheatreEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async create(data: CreateTheatreDto[]) {
    const params = data.map((item) => this.theatreRepository.create(item));
    return await this.theatreRepository.save(params);
  }

  async truncate(): Promise<void> {
    const tableName = this.theatreRepository.metadata.tableName;

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
      throw new Error('Internal Server Error');
    } finally {
      await queryRunner.release();
    }
  }
}
