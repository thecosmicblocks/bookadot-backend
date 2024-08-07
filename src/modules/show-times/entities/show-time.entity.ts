import { MOVIE_FORMAT } from 'src/constants';
import { AbstractEntity } from 'src/database/abstract/abstract.entity';
import { MovieEntity } from 'src/modules/movies/movie.entity';
import { TheatreEntity } from 'src/modules/theatres/theatre.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'show_times' })
export class ShowTimeEntity extends AbstractEntity {
  @Column({ type: 'enum', enum: MOVIE_FORMAT, default: MOVIE_FORMAT.TWO_D })
  format: MOVIE_FORMAT;

  @Column({ type: 'varchar', length: 255, nullable: false })
  language: string;

  @Column({ type: 'timestamptz', nullable: false })
  startTime: Date;

  @Column({ type: 'timestamptz', nullable: false })
  endTime: Date;

  @ManyToOne(() => MovieEntity, (movie) => movie.showTimes)
  movie: MovieEntity;

  @ManyToOne(() => TheatreEntity, (theatre) => theatre.showTimes)
  theatre: MovieEntity;
}
