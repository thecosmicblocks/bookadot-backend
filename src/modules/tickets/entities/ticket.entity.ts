import { AbstractEntity } from 'src/database/abstract/abstract.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { SessionEntity } from 'src/modules/sessions/entities/session.entity';
import { ReservationEntity } from 'src/modules/reservations/entities/reservation.entity';
import { SeatEntity } from 'src/modules/seats/entities/seat.entity';

@Entity({ name: 'tickets' })
export class TicketEntity extends AbstractEntity {
  @ManyToOne(() => SeatEntity, (seat) => seat.tickets)
  @JoinColumn({ name: 'seat_id' })
  seat: SeatEntity;

  @ManyToOne(() => SessionEntity, (session) => session.tickets)
  @JoinColumn({ name: 'session_id' })
  session: SessionEntity;

  @ManyToOne(() => ReservationEntity, (reservation) => reservation.tickets)
  @JoinColumn({ name: 'reservation_id' })
  reservation: ReservationEntity;
}
