import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from 'src/database/abstract/abstract.entity';
import { CategoryEntity } from '../categories/category.entity';
import { SessionEntity } from '../sessions/entities/session.entity';

@Entity({ name: 'movies' })
export class MovieEntity extends AbstractEntity {
  @Column({
    name: 'category_id',
    type: 'varchar',
    nullable: true,
  })
  categoryId: string;

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

  @ManyToOne(() => CategoryEntity, (category) => category.movies)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @OneToMany(() => SessionEntity, (session) => session.movie)
  sessions: SessionEntity[];
}
