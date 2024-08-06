import { AbstractEntity } from 'src/database/abstract/abstract.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity({ name: 'reservation' })
export class ReservationEntity extends AbstractEntity {
  @Column({ type: 'number', nullable: true })
  totalSeats: number;

  @ManyToOne(() => UserEntity, (user) => user.reservations)
  user: UserEntity;
}
