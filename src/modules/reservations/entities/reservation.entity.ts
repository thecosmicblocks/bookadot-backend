import { AbstractEntity } from 'src/database/abstract/abstract.entity';
import { TicketEntity } from 'src/modules/seats/entities/ticket.entity';
import { SessionEntity } from 'src/modules/sessions/entities/session.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'reservations' })
export class ReservationEntity extends AbstractEntity {
  @Column({ type: 'numeric', nullable: false })
  totalPrices: number;

  @ManyToOne(() => UserEntity, (user) => user.reservations)
  user: UserEntity;

  @ManyToOne(() => SessionEntity, (session) => session.reservations)
  session: SessionEntity;

  @OneToMany(() => TicketEntity, (ticket) => ticket.reservation)
  tickets: TicketEntity[];
}
