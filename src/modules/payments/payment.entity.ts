import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ReservationEntity } from '../reservations/entities/reservation.entity';
import { PAYMENT_STATUS } from 'src/constants';
import { AbstractEntity } from 'src/database/abstract/abstract.entity';

@Entity('payment')
export class PaymentEntity extends AbstractEntity {
  @Column({ name: 'payment_method', type: 'varchar', length: 50 })
  paymentMethod: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: PAYMENT_STATUS,
    default: PAYMENT_STATUS.PENDING,
  })
  status: PAYMENT_STATUS;

  @Column({
    name: 'payment_time',
    type: 'timestamp',
    nullable: true,
  })
  paymentTime: Date;

  @ManyToOne(() => ReservationEntity, (reservation) => reservation.payments)
  @JoinColumn({ name: 'reservation_id' })
  reservation: ReservationEntity;
}
