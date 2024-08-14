import { TICKET_TYPE } from 'src/constants';
import { AbstractEntity } from 'src/database/abstract/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { SessionEntity } from 'src/modules/sessions/entities/session.entity';
import { ReservationInfoEntity } from 'src/modules/reservation-infos/entities/reservation-info.entity';

@Entity({ name: 'tickets' })
export class TicketEntity extends AbstractEntity {
  @Column({ type: 'enum', enum: TICKET_TYPE })
  ticketType: TICKET_TYPE;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ name:'session_id', type: 'int', nullable: false })
  sessionId: number;

  @ManyToOne(() => SessionEntity, (session) => session.tickets)
  @JoinColumn({ name: 'session_id' })
  session: SessionEntity;

  @OneToMany(() => ReservationInfoEntity, (reservationInfo) => reservationInfo.ticket)
  reservationInfo: ReservationInfoEntity[];
}
