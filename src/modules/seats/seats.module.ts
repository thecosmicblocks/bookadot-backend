import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatEntity } from './entities/seat.entity';
import { SeatsController } from './seats.controller';
import { SeatService } from './seat.service';
import { TheatresModule } from '../theatres/theatres.module';
import { TicketEntity } from './entities/ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SeatEntity, TicketEntity]),
    TheatresModule,
  ],
  controllers: [SeatsController],
  exports: [SeatService],
  providers: [SeatService],
})
export class SeatsModule {}
