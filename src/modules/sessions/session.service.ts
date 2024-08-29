import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import { SessionEntity } from './entities/session.entity';
import { CreateSessionDto } from './dtos/request.dto';
import { MOVIE_FORMAT, Order, Paginate } from 'src/constants';
import * as moment from 'moment';
import { TheatresService } from '../theatres/theatres.service';
import { MovieService } from '../movies/movie.service';
import { SeatService } from '../seats/seats.service';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>,
    private dataSource: DataSource,
    private readonly theatreService: TheatresService,
    private readonly movieService: MovieService,
    private readonly seatService: SeatService,
  ) {}

  async getList(params: any): Promise<{
    sessions: SessionEntity[];
    total: number;
    page: number;
    limit: number;
  }> {
    const {
      movieId,
      date = new Date(),
      orderTimeType = Order.ASC,
      page = Paginate.page,
      limit = Paginate.limit,
    } = params;

    const startDate = moment(date).format('YYYY-MM-DD');

    const query = this.sessionRepository
      .createQueryBuilder('session')
      .leftJoinAndSelect('session.theatre', 'theatre')
      .leftJoinAndSelect('session.tickets', 'tickets')
      .where('session.movieId = :movieId', { movieId })
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
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

  async seed(): Promise<void> {
    const theatres = await this.theatreService.getAll();

    for (const theatre of theatres) {
      const sessionCount = Math.floor(Math.random() * 2) + 2; // 2 or 3 sessions
      const movies = await this.movieService.getAll();

      let previousEndTime = dayjs().set('hour', 10).set('minute', 0); // First session starts at 10:00 AM

      for (let i = 0; i < sessionCount; i++) {
        const movie = movies[Math.floor(Math.random() * movies.length)];

        // Start time is 10 minutes after the previous session's end time
        const startTime = previousEndTime.add(10, 'minute').toDate();
        const endTime = dayjs(startTime).add(120, 'minute').toDate();

        const session = this.sessionRepository.create({
          format: MOVIE_FORMAT.TWO_D, // default format
          language: 'English', // default language
          startTime,
          endTime,
          movie,
          theatre,
        });

        await this.sessionRepository.save(session);
        // await this.seatService.seedTicketsForSession(session);

        previousEndTime = dayjs(endTime); // Update the end time for the next session
      }
    }
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
