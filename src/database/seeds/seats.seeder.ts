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

  const params = [];
  const column = 12;
  const row = 10;

  for (let i = 0; i < theatres.length; i++) {
    for (let j = 0; j < row; j++) {
      for (let k = 0; k < column; k++) {
        params.push({
          theatreId: theatres[i].id,
          column: k,
          row: j,
          coordinates: [j, k]
        });
      }
    }
  }

  try {
    await seatService.truncate();
    await seatService.create(params);
  } catch (error) {
    console.log('Seed seat fail!', error);
  }
  await app.close();
  process.exit(0);
};

seedSeat();
