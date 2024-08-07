import { AbstractEntity } from 'src/database/abstract/abstract.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'reservations' })
export class ReservationEntity extends AbstractEntity {
  @Column({ type: 'numeric', nullable: false })
  totalSeats: number;

  @ManyToOne(() => UserEntity, (user) => user.reservations)
  user: UserEntity;
}
