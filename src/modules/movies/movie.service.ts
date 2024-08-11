import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, Like } from 'typeorm';

import { MovieEntity } from './movie.entity';
import { CreateMovieDto, FilterMovieDto } from './dtos/request.dto';
import { Order, Paginate } from 'src/constants';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private movieRepository: Repository<MovieEntity>,
    private dataSource: DataSource,
  ) {}

  async getMovies(params: any): Promise<{
    movies: MovieEntity[],
    total: number,
    page: number,
    limit: number
  }> {
    const {
      title,
      categoryName,
      page = Paginate.page,
      limit = Paginate.limit,
      orderBy = 'title',
      orderType = Order.ASC,
    } = params;

    const queryBuilder = this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.category', 'category');

    if (title) {
      queryBuilder.andWhere('movie.title LIKE :title', { title: `%${title}%` });
    }

    if (categoryName) {
      queryBuilder.andWhere('category.name LIKE :category_name', {
        category_name: `%${categoryName}%`,
      });
    }

    // Pagination
    const offset = (page - 1) * limit;
    queryBuilder.skip(offset).take(limit);

    // Order By
    queryBuilder.orderBy(`movie.${orderBy}`, orderType);

    // Execute query and get total count
    const [movies, total] = await queryBuilder.getManyAndCount();

    return { movies, total, page, limit };
  }

  async getMovieById(id?: string): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return movie;
  }

  async getAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find();
  }

  async create(data: any): Promise<CreateMovieDto> {
    return await this.movieRepository.save(data);
  }

  async truncate(): Promise<void> {
    const tableName = this.movieRepository.metadata.tableName;

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
