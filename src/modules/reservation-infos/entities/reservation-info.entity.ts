import { AbstractEntity } from 'src/database/abstract/abstract.entity';
import { TicketEntity } from 'src/modules/tickets/entities/ticket.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { ReservationEntity } from 'src/modules/reservations/entities/reservation.entity';
import { SeatEntity } from 'src/modules/seats/entities/seat.entity';
import { SessionEntity } from 'src/modules/sessions/entities/session.entity';

@Entity({ name: 'reservation_infos' })
@Unique(['seatId', 'sessionId'])
export class ReservationInfoEntity extends AbstractEntity {
  @Column({
    name: 'reservation_id',
    type: 'varchar',
    nullable: false
  })
  reservationId: string;

  @Column({
    name: 'ticket_id',
    type: 'varchar',
    nullable: false
  })
  ticketId: string;

  @Column({
    name: 'seat_id',
    type: 'varchar',
    nullable: false
  })
  seatId: string;

  @Column({
    name: 'session_id',
    type: 'varchar',
    nullable: false
  })
  sessionId: string;

  @ManyToOne(() => ReservationEntity, (reservation) => reservation.reservationInfos)
  @JoinColumn({ name: 'reservation_id' })
  reservation: ReservationEntity;

  @ManyToOne(() => TicketEntity, (ticket) => ticket.reservationInfo)
  @JoinColumn({ name: 'ticket_id' })
  ticket: TicketEntity;

  @ManyToOne(() => SeatEntity, (seat) => seat.reservationInfo)
  @JoinColumn({ name: 'seat_id' })
  seat: SeatEntity;

  @ManyToOne(() => SessionEntity, (session) => session.reservationInfos)
  @JoinColumn({ name: 'session_id' })
  session: SessionEntity;
}
