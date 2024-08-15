import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TicketEntity } from './entities/ticket.entity';
import { TicketService } from './ticket.service';

@Module({
  imports: [TypeOrmModule.forFeature([TicketEntity])],
  controllers: [],
  exports: [TicketService],
  providers: [TicketService],
})
export class TicketModule {}
