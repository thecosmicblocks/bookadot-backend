import { TICKET_TYPE } from 'src/constants';
import { AbstractEntity } from 'src/database/abstract/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { SeatEntity } from './seat.entity';
import { SessionEntity } from 'src/modules/sessions/entities/session.entity';
import { ReservationEntity } from 'src/modules/reservations/entities/reservation.entity';

@Entity({ name: 'tickets' })
export class TicketEntity extends AbstractEntity {
  @Column({ type: 'enum', enum: TICKET_TYPE })
  ticketType: TICKET_TYPE;

  @Column({ type: 'int', nullable: false })
  price: number;

  @ManyToOne(() => SeatEntity, (seat) => seat.tickets)
  seat: SeatEntity;

  @ManyToOne(() => SessionEntity, (session) => session.tickets)
  session: SessionEntity;

  @ManyToOne(() => ReservationEntity, (reservation) => reservation.tickets)
  reservation: ReservationEntity;
}
