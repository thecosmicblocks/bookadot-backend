import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeatEntity } from './entities/seat.entity';
import { TheatresService } from '../theatres/theatres.service';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(SeatEntity)
    private readonly seatRepository: Repository<SeatEntity>,

    private readonly theatreService: TheatresService,
  ) {}

  async seed(theatreId: string): Promise<SeatEntity[]> {
    // Fetch the theater by ID
    console.log(theatreId, 'ss');
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
}
