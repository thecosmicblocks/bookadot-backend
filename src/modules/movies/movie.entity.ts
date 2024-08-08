import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { CategoryEntity } from '../categories/category.entity';
import { SessionEntity } from '../sessions/entities/session.entity';

@Entity({ name: 'movies' })
export class MovieEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    unsigned: true,
  })
  id: number;

  @Column({
    name: 'category_id',
    type: 'bigint',
    nullable: true,
  })
  categoryId: number;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 200,
  })
  title: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'movie_url',
    type: 'varchar',
    nullable: true,
  })
  movieUrl: string;

  @Column({
    name: 'trailer_url',
    type: 'varchar',
    nullable: true,
  })
  trailerUrl: string;

  @Column({
    name: 'poster_url',
    type: 'varchar',
    nullable: true,
  })
  posterUrl: string;

  @Column({
    name: 'imdb_rating',
    type: 'int',
    default: 0,
    nullable: true,
  })
  imdbRating: number;

  @Column({
    name: 'knopoisk_rating',
    type: 'int',
    default: 0,
    nullable: true,
  })
  knopoiskRating: number;

  @Column({
    name: 'certificate',
    type: 'varchar',
    nullable: true,
  })
  certificate: string;

  @Column({
    name: 'runtime',
    type: 'varchar',
    nullable: true,
  })
  runtime: string;

  @Column({
    name: 'release',
    type: 'timestamp',
    nullable: true,
  })
  release: Date;

  @Column({
    name: 'director',
    type: 'varchar',
    nullable: true,
  })
  director: string;

  @Column({
    name: 'cast',
    type: 'varchar',
    nullable: true,
  })
  cast: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updatedAt: Date;

  @BeforeInsert()
  createDates() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateDates() {
    this.updatedAt = new Date();
  }

  @ManyToOne(() => CategoryEntity, (category) => category.movies)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @OneToMany(() => SessionEntity, (session) => session.movie)
  sessions: SessionEntity[];
}
