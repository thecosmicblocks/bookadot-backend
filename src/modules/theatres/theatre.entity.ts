import { AbstractEntity } from 'src/database/abstract/abstract.entity';
import { Column, Entity } from 'typeorm';

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
}
