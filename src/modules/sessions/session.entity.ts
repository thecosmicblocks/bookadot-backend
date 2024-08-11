import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AbstractEntity } from 'src/database/abstract/abstract.entity';
import { MovieEntity } from '../movies/movie.entity';
import { TheatreEntity } from '../theatres/theatre.entity';

@Entity({ name: 'sessions' })
export class SessionEntity extends AbstractEntity {
  @Column({
    name: 'movie_id',
    type: 'varchar',
    nullable: true,
  })
  movieId: string;

  @Column({
    name: 'theatre_id',
    type: 'varchar',
    nullable: true,
  })
  theatreId: string;

  @Column({
    name: 'format',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  format: string;

  @Column({
    name: 'adult_price',
    type: 'int',
    nullable: true,
  })
  adultPrice: number;

  @Column({
    name: 'child_price',
    type: 'int',
    nullable: true,
  })
  childPrice: number;

  @Column({
    name: 'student_price',
    type: 'int',
    nullable: true,
  })
  studentPrice: number;

  @Column({
    name: 'vip_price',
    type: 'int',
    nullable: true,
  })
  vipPrice: number;

  @Column({
    name: 'language',
    type: 'varchar',
    nullable: true,
  })
  language: string;

  @Column({
    name: 'start_time',
    type: 'timestamp',
    nullable: true,
  })
  startTime: Date;

  @Column({
    name: 'end_time',
    type: 'timestamp',
    nullable: true,
  })
  endTime: Date;

  @ManyToOne(() => MovieEntity, (movie) => movie.sessions)
  @JoinColumn({ name: 'movie_id' })
  movie: MovieEntity;

  @ManyToOne(() => TheatreEntity, (theatre) => theatre.sessions)
  @JoinColumn({ name: 'theatre_id' })
  theatre: TheatreEntity;
}
