import { Module, INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SessionService } from 'src/modules/sessions/session.service';
import { AppModule } from 'src/app.module';
import { TICKET_TYPE, TICKET_PRICE } from 'src/constants';
import { TicketService } from 'src/modules/tickets/ticket.service';

@Module({
  imports: [AppModule],
})
class CommandModule {}

export const seedTicket = async () => {
  const app: INestApplicationContext =
  await NestFactory.createApplicationContext(CommandModule);
  const ticketService = app.get(TicketService);
  const sessionService = app.get(SessionService);

  const sessions = (await sessionService.getAll()) ?? [];

  const params = [];
  const ticketType = Object.keys(TICKET_TYPE);
  const ticketTypeValue = Object.values(TICKET_TYPE);

  for (let i = 0; i < sessions.length; i++) {
    for (let j = 0; j < ticketType.length; j++) {
      const randomType = Math.floor(Math.random() * ticketType.length);
      const randomPriceIndex = Math.floor(Math.random() * Object.keys(TICKET_PRICE[ticketType[j]]).length );

      params.push({
        sessionId: sessions[i].id,
        ticketType: ticketTypeValue[randomType] as TICKET_TYPE,
        price: TICKET_PRICE[ticketType[j]][randomPriceIndex],
      });
    }
  }

  try {
    await ticketService.truncate();
    await ticketService.create(params);
  } catch (error) {
    console.log('Seed tickets fail!', error);
  }
  await app.close();
  process.exit(0);
};

seedTicket();
