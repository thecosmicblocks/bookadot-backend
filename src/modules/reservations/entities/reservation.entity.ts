import { AbstractEntity } from 'src/database/abstract/abstract.entity';
import { TicketEntity } from 'src/modules/tickets/entities/ticket.entity';
import { SessionEntity } from 'src/modules/sessions/entities/session.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ReservationInfoEntity } from 'src/modules/reservation-infos/entities/reservation-info.entity';

@Entity({ name: 'reservations' })
export class ReservationEntity extends AbstractEntity {
  @Column({ type: 'numeric', nullable: false })
  totalPrices: number;

  @ManyToOne(() => UserEntity, (user) => user.reservations)
  user: UserEntity;

  @ManyToOne(() => SessionEntity, (session) => session.reservations)
  session: SessionEntity;

  @OneToMany(() => ReservationInfoEntity, (info) => info.reservation)
  reservationInfos: ReservationInfoEntity[];
}
