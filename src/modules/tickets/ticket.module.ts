import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TicketEntity } from '../seats/entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TicketEntity])],
  controllers: [],
  exports: [],
  providers: [],
})
export class TicketModule {}
