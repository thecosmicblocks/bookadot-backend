import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeatEntity } from './entities/seat.entity';
import { TheatresService } from '../theatres/theatres.service';
import { SessionEntity } from '../sessions/entities/session.entity';
import { TicketEntity } from './entities/ticket.entity';
import { TICKET_TYPE } from 'src/constants';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(SeatEntity)
    private readonly seatRepository: Repository<SeatEntity>,
    @InjectRepository(SeatEntity)
    private readonly ticketRepository: Repository<TicketEntity>,

    private readonly theatreService: TheatresService,
  ) {}

  async seed(theatreId: string): Promise<SeatEntity[]> {
    // Fetch the theater by ID
    const theatre = await this.theatreService.findOne(theatreId);
    if (!theatre) {
      throw new NotFoundException(`Theatre with ID ${theatreId} not found`);
    }

    // Clear existing seats for this theater
    await this.seatRepository.delete({ theatre });

    const seats: SeatEntity[] = [];
    const totalRows = 11; // 11 rows from 'A' to 'K'
    const totalColumns = 15; // 15 columns per row
    const startRow = 'A'.charCodeAt(0); // ASCII value for 'A'

    // Create and save seats
    for (let row = 0; row < totalRows; row++) {
      for (let col = 1; col <= totalColumns; col++) {
        const seat = new SeatEntity();
        seat.row = String.fromCharCode(startRow + row); // Converts ASCII to row letter
        seat.column = col;
        seat.coordinates = [col, row];
        seat.theatre = theatre;

        seats.push(seat);
      }
    }

    // Save all seats to the database in a single operation
    await this.seatRepository.save(seats);

    return seats;
  }

  async seedTicketsForSession(session: SessionEntity): Promise<void> {
    const seats = await this.seatRepository.find({
      where: { theatre: { id: session.theatre.id } },
      select: ['id', 'row', 'column', 'coordinates', 'theatre'], // Ensure all necessary fields are selected
    });

    const priceOptions = [60000, 70000, 80000, 100000];
    const tickets = seats.map((seat) => {
      const ticket = this.ticketRepository.create();
      ticket.ticketType = TICKET_TYPE.ADULT; // Default ticket type
      ticket.price =
        priceOptions[Math.floor(Math.random() * priceOptions.length)];
      ticket.seat = seat;
      ticket.session = session;
      ticket.reservation = null;

      return ticket;
    });

    await this.ticketRepository.save(tickets);
  }
}
