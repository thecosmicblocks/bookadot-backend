import { MOVIE_FORMAT } from 'src/constants';
import { AbstractEntity } from 'src/database/abstract/abstract.entity';
import { MovieEntity } from 'src/modules/movies/movie.entity';
import { ReservationEntity } from 'src/modules/reservations/entities/reservation.entity';
import { TicketEntity } from 'src/modules/seats/entities/ticket.entity';
import { TheatreEntity } from 'src/modules/theatres/theatre.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'sessions' })
export class SessionEntity extends AbstractEntity {
  @Column({ type: 'enum', enum: MOVIE_FORMAT, default: MOVIE_FORMAT.TWO_D })
  format: MOVIE_FORMAT;

  @Column({ type: 'varchar', length: 255, nullable: false })
  language: string;

  @Column({ type: 'timestamptz', nullable: false })
  startTime: Date;

  @Column({ type: 'timestamptz', nullable: false })
  endTime: Date;

  @ManyToOne(() => MovieEntity, (movie) => movie.sessions)
  movie: MovieEntity;

  @ManyToOne(() => TheatreEntity, (theatre) => theatre.sessions)
  theatre: TheatreEntity;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.session)
  reservations: ReservationEntity[];

  @OneToMany(() => TicketEntity, (ticket) => ticket.session)
  tickets: TicketEntity[];
}
