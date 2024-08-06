import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TheatreEntity } from './theatre.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateTheatreDto } from './dtos/create-theatre.dto';
import { Order, Paginate } from 'src/constants';
import * as moment from 'moment';

@Injectable()
export class TheatresService {
  constructor(
    @InjectRepository(TheatreEntity)
    private readonly theatreRepository: Repository<TheatreEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async getAll(): Promise<TheatreEntity[]> {
    return await this.theatreRepository.find();
  }

  async getListByMovie(params: any): Promise<{
    theatres: TheatreEntity[],
    total: number,
    page: number,
    limit: number
  }> {
    const {
      movieId,
      date = new Date(),
      orderTimeType = Order.ASC,
      page = Paginate.page,
      limit = Paginate.limit
    } = params;

    const startDate = moment(date).format('YYYY-MM-DD');

    const query = this.theatreRepository
      .createQueryBuilder('theatre')
      .leftJoinAndSelect('theatre.sessions', 'sessions')
      .where('sessions.movie_id = :movieId', { movieId })
      .andWhere('DATE(sessions.startTime) = :startDate', { startDate })
      .orderBy('theatre.location', 'ASC')
      .addOrderBy('sessions.startTime', orderTimeType);

    // Pagination
    const offset = (page - 1) * limit;
    query.skip(offset).take(limit);

    // Execute query and get total count
    const [theatres, total] = await query.getManyAndCount();

    return { theatres, total, page, limit };
  }

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
