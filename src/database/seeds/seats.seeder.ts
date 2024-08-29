import { Module, INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SeatService } from 'src/modules/seats/seats.service';
import { TheatresService } from 'src/modules/theatres/theatres.service';
import { AppModule } from 'src/app.module';

@Module({
  imports: [AppModule],
})
class CommandModule {}

export const seedSeat = async () => {
  const app: INestApplicationContext =
    await NestFactory.createApplicationContext(CommandModule);
  const seatService = app.get(SeatService);
  const theatresService = app.get(TheatresService);

  const theatres = (await theatresService.getAll()) ?? [];

  try {
    await seatService.truncate();
    for (const theatre of theatres) {
      await seatService.seed(theatre.id);
    }
  } catch (error) {
    console.log(error);
  }

  await app.close();
  process.exit(0);
};

seedSeat();
