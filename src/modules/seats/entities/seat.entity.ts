import { AbstractEntity } from 'src/database/abstract/abstract.entity';
import { TheatreEntity } from 'src/modules/theatres/theatre.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ReservationInfoEntity } from 'src/modules/reservation-infos/entities/reservation-info.entity';

@Entity({ name: 'seats' })
export class SeatEntity extends AbstractEntity {
  @Column({
    name: 'theatre_id',
    type: 'varchar',
    nullable: false
  })
  theatreId: string;

  @Column({ type: 'varchar', length: 1, nullable: false })
  row: string;

  @Column({ type: 'int', nullable: false })
  column: number;

  @Column({ type: 'int', array: true, nullable: false })
  coordinates: number[];

  @ManyToOne(() => TheatreEntity, (theatre) => theatre.seats)
  @JoinColumn({ name: 'theatre_id' })
  theatre: TheatreEntity;

  @OneToMany(() => ReservationInfoEntity, (reservationInfo) => reservationInfo.seat)
  reservationInfo: ReservationInfoEntity[];
}
