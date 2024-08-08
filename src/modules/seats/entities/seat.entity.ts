import { AbstractEntity } from 'src/database/abstract/abstract.entity';
import { TheatreEntity } from 'src/modules/theatres/theatre.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { TicketEntity } from './ticket.entity';

@Entity({ name: 'seats' })
export class SeatEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 1, nullable: false })
  row: string;

  @Column({ type: 'int', nullable: false })
  column: number;

  @Column({ type: 'int', array: true, nullable: false })
  coordinates: number[];

  @ManyToOne(() => TheatreEntity, (theatre) => theatre.seats)
  theatre: TheatreEntity;

  @OneToMany(() => TicketEntity, (ticket) => ticket.seat)
  tickets: TicketEntity;
}
