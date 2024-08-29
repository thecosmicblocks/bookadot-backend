import { AbstractEntity } from 'src/database/abstract/abstract.entity';
import { PaymentEntity } from 'src/modules/payments/payment.entity';
import { TicketEntity } from 'src/modules/tickets/entities/ticket.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'reservations' })
export class ReservationEntity extends AbstractEntity {
  @Column({ name: 'reservation_type', type: 'varchar', nullable: false })
  reservationType: string;

  @ManyToOne(() => UserEntity, (user) => user.reservations)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => TicketEntity, (ticket) => ticket.reservation)
  tickets: TicketEntity[];

  @OneToMany(() => PaymentEntity, (payment) => payment.reservation)
  payments: PaymentEntity[];
}
