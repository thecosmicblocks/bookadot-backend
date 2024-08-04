import { INestApplicationContext, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { CreateTheatreDto } from 'src/modules/theatres/dtos/create-theatre.dto';
import { TheatresService } from 'src/modules/theatres/theatres.service';

@Module({
  imports: [AppModule],
})
class CommandModule {}

export const seedTheatres = async () => {
  const app: INestApplicationContext =
    await NestFactory.createApplicationContext(CommandModule);
  const theatresService = app.get(TheatresService);

  const theatresData = await require('src/common/data-template/theatres.json');
  const params: CreateTheatreDto[] = [];
  for (let i = 0; i < theatresData.length; i++) {
    params.push({
      name: theatresData[i].name,
      address: theatresData[i].address,
      location: theatresData[i].location,
      totalSeats: theatresData[i].totalSeats,
    });
  }

  try {
    await theatresService.truncate();
    await theatresService.create(params);
  } catch (error) {
    console.log('Seed movies fail!', error);
  }
  await app.close();
  process.exit(0);
};

seedTheatres();
