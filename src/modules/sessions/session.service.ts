import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, Like } from 'typeorm';

import { SessionEntity } from './entities/session.entity';
import { CreateSessionDto } from './dtos/request.dto';
import { Order, Paginate } from 'src/constants';
import * as moment from 'moment';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>,
    private dataSource: DataSource,
  ) {}

  async getList(params: any): Promise<{
    sessions: SessionEntity[],
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

    const query = this.sessionRepository
      .createQueryBuilder('session')
      .leftJoinAndSelect('session.theatre', 'theatre')
      .leftJoinAndSelect('session.tickets', 'tickets')
      .where('session.movieId = :movieId', { movieId })
      .andWhere(qb => {
        const subQuery = qb.subQuery()
          .select('MIN(session2.startTime)')
          .from('sessions', 'session2')
          .where('session2.theatreId = session.theatreId')
          .getQuery();
        return `session.startTime = ${subQuery}`;
      })
      .andWhere('DATE(session.startTime) = :startDate', { startDate })
      .orderBy('session.startTime', orderTimeType);

    // Pagination
    const offset = (page - 1) * limit;
    query.skip(offset).take(limit);

    // Execute query and get total count
    const [sessions, total] = await query.getManyAndCount();

    return { sessions, total, page, limit };
  }

  async getAll(): Promise<SessionEntity[]> {
    return this.sessionRepository.find();
  }

  async create(data: any): Promise<CreateSessionDto> {
    return await this.sessionRepository.save(data);
  }

  async truncate(): Promise<void> {
    const tableName = this.sessionRepository.metadata.tableName;

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
