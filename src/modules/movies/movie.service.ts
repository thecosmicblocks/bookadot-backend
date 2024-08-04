import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, Like } from 'typeorm';

import { MovieEntity } from './movie.entity';
import { CreateMovieDto } from './dtos/request.dto';

export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private movieRepository: Repository<MovieEntity>,
    private dataSource: DataSource,
  ) {}

  async getMovies(params: any): Promise<MovieEntity[]> {
    const { title, category_name } = params;
    const queryBuilder = this.movieRepository.createQueryBuilder('movie')
      .leftJoinAndSelect('movie.category', 'category');

    if (title) {
      queryBuilder.andWhere('movie.title LIKE :title', { title: `%${title}%` });
    }

    if (category_name) {
      queryBuilder.andWhere('category.name LIKE :category_name', { category_name: `%${category_name}%` });
    }

    return await queryBuilder.getMany();
  }

  async getMovieById(id: number): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return movie;
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
      await queryRunner.query(`TRUNCATE TABLE ${tableName} RESTART IDENTITY CASCADE`);
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
