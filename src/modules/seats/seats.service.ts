import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { SeatEntity } from './entities/seat.entity';
import { TheatresService } from '../theatres/theatres.service';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(SeatEntity)
    private seatRepository: Repository<SeatEntity>,
    private dataSource: DataSource,
    private readonly theatreService: TheatresService,
  ) {}

  async create(data: any): Promise<SeatEntity> {
    return await this.seatRepository.save(data);
  }

  async seed(theatreId: string): Promise<SeatEntity[]> {
    // Fetch the theater by ID
    const theatre = await this.theatreService.findOne(theatreId);
    if (!theatre) {
      throw new NotFoundException(`Theatre with ID ${theatreId} not found`);
    }

    // Clear existing seats for this theater
    // await this.seatRepository.delete({ theatre });

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
        seat.count = 1;

        seats.push(seat);
      }
    }

    // Save all seats to the database in a single operation
    await this.seatRepository.save(seats);

    return seats;
  }

  async truncate(): Promise<void> {
    const tableName = this.seatRepository.metadata.tableName;

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
