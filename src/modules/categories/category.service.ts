import {
    InternalServerErrorException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { DataSource, Repository } from 'typeorm';

  import { CategoryEntity } from './category.entity';
  import { CreateCategoryDto } from './dtos/request.dto';
import { promises } from 'dns';

  export class CategoryService {
    constructor(
      @InjectRepository(CategoryEntity)
      private categoryRepository: Repository<CategoryEntity>,
      private dataSource: DataSource,
    ) {}

    async getAll(): Promise<CategoryEntity[]> {
        return await this.categoryRepository.find();
    }

    async create(data: any): Promise<CreateCategoryDto> {
      return await this.categoryRepository.save(data);
    }

    async truncate(): Promise<void> {
      const tableName = this.categoryRepository.metadata.tableName;

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
