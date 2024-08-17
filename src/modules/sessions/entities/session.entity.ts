import { MOVIE_FORMAT } from 'src/constants';
import { AbstractEntity } from 'src/database/abstract/abstract.entity';
import { MovieEntity } from 'src/modules/movies/movie.entity';
import { ReservationEntity } from 'src/modules/reservations/entities/reservation.entity';
import { TicketEntity } from 'src/modules/tickets/entities/ticket.entity';
import { TheatreEntity } from 'src/modules/theatres/theatre.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ReservationInfoEntity } from 'src/modules/reservation-infos/entities/reservation-info.entity';

@Entity({ name: 'sessions' })
export class SessionEntity extends AbstractEntity {
  @Column({
    name: 'movie_id',
    type: 'varchar',
    nullable: false,
  })
  movieId: string;

  @Column({
    name: 'theatre_id',
    type: 'varchar',
    nullable: false,
  })
  theatreId: string;

  @Column({ type: 'enum', enum: MOVIE_FORMAT, default: MOVIE_FORMAT.TWO_D })
  format: MOVIE_FORMAT;

  @Column({ type: 'varchar', length: 255, nullable: true })
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

  @OneToMany(() => ReservationInfoEntity, (reservationInfos) => reservationInfos.session)
  reservationInfos: ReservationEntity[];

  @OneToMany(() => TicketEntity, (ticket) => ticket.session)
  tickets: TicketEntity[];
}
