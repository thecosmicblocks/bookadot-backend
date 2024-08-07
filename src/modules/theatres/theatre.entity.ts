import { AbstractEntity } from 'src/database/abstract/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ShowTimeEntity } from '../show-times/entities/show-time.entity';
import { SeatEntity } from '../seats/entities/seat.entity';

@Entity({ name: 'theatres' })
export class TheatreEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: '255', nullable: false })
  name: string;

  @Column({ type: 'varchar', length: '500', nullable: true })
  address: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  totalSeats: number;

  @OneToMany(() => ShowTimeEntity, (showTime) => showTime.theatre)
  showTimes: ShowTimeEntity[];

  @OneToMany(() => SeatEntity, (seat) => seat.theatre)
  seats: SeatEntity[];
}
