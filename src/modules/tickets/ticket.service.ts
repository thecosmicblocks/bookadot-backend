import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { TicketEntity } from './entities/ticket.entity';
import { SeatService } from '../seats/seats.service';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(TicketEntity)
    private ticketRepository: Repository<TicketEntity>,
    private dataSource: DataSource,

    private seatService: SeatService,
  ) {}

  async create(data: any): Promise<any> {
    return await this.ticketRepository.save(data);
  }

  // async seedTicketsForSession(session: SessionEntity): Promise<void> {
  //   const seats = await this.seatService.find({
  //     where: { theatre: { id: session.theatre.id } },
  //   });

  //   if (seats.length) {
  //     const tickets = seats.map((seat) => {
  //       const ticket = this.ticketRepository.create({
  //         seat,
  //         session,
  //         reservation: null,
  //       });

  //       return ticket;
  //     });

  //     await this.ticketRepository.save(tickets);
  //   }
  // }

  async truncate(): Promise<void> {
    const tableName = this.ticketRepository.metadata.tableName;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();
    try {
      await queryRunner.query(
        `TRUNCATE TABLE ${tableName} RESTART IDENTITY CASCADE`,
      );
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(`Error truncating ${tableName} table: ${error.message}`);
      throw new InternalServerErrorException('Internal Server Error');
    } finally {
      await queryRunner.release();
    }
  }
}
