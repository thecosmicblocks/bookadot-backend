import { AbstractEntity } from 'src/database/abstract/abstract.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ReservationInfoEntity } from 'src/modules/reservation-infos/entities/reservation-info.entity';

@Entity({ name: 'reservations' })
export class ReservationEntity extends AbstractEntity {
  @Column({
    name: 'user_id',
    type: 'varchar',
    nullable: false
  })
  userId: string;

  @Column({
    name: 'total_price',
    type: 'numeric',
    nullable: false
  })
  totalPrice: number;

  @ManyToOne(() => UserEntity, (user) => user.reservations)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => ReservationInfoEntity, (info) => info.reservation)
  reservationInfos: ReservationInfoEntity[];
}
