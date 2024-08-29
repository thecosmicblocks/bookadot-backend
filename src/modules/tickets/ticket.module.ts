import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TicketEntity } from './entities/ticket.entity';
import { TicketService } from './ticket.service';
import { SeatsModule } from '../seats/seats.module';

@Module({
  imports: [TypeOrmModule.forFeature([TicketEntity]), SeatsModule],
  controllers: [],
  exports: [TicketService],
  providers: [TicketService],
})
export class TicketModule {}
