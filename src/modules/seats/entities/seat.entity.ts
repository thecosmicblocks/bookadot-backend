import { AbstractEntity } from 'src/database/abstract/abstract.entity';
import { TheatreEntity } from 'src/modules/theatres/entities/theatre.entity';
import { TicketEntity } from 'src/modules/tickets/entities/ticket.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'seats' })
export class SeatEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 1, nullable: false })
  row: string;

  @Column({ type: 'int', nullable: false })
  column: number;

  @Column({ type: 'int', array: true, nullable: false })
  coordinates: number[];

  @Column({ type: 'int', nullable: false })
  count: number;

  @ManyToOne(() => TheatreEntity, (theatre) => theatre.seats)
  @JoinColumn({ name: 'theatre_id' })
  theatre: TheatreEntity;

  @OneToMany(() => TicketEntity, (ticket) => ticket.seat)
  tickets: TicketEntity;
}
