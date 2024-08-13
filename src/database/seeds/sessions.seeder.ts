import { Module, INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { faker } from '@faker-js/faker';
import { MovieService } from 'src/modules/movies/movie.service';
import { SessionService } from 'src/modules/sessions/session.service';
import { TheatresService } from 'src/modules/theatres/theatres.service';
import { AppModule } from 'src/app.module';
import { MOVIE_FORMAT } from 'src/constants';

@Module({
  imports: [AppModule],
})
class CommandModule {}

export const seedSession = async () => {
  const app: INestApplicationContext =
    await NestFactory.createApplicationContext(CommandModule);
  const sessionService = app.get(SessionService);
  const movieService = app.get(MovieService);
  const theatresService = app.get(TheatresService);

  const movies = (await movieService.getAll()) ?? [];
  const theatres = (await theatresService.getAll()) ?? [];

  const params = [];
  const formats = Object.values(MOVIE_FORMAT);

  for (let i = 0; i < movies.length; i++) {
    for (let j = 0; j < 3; j++) {
      const randomTheatreIndex = Math.floor(Math.random() * theatres.length);
      const randomFormat = Math.floor(Math.random() * formats.length);

      const startTime = faker.date.soon();
      const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);

      params.push({
        movieId: movies.length > 0 ? movies[i].id : 0,
        theatreId: movies.length > 0 ? theatres[randomTheatreIndex].id : 0,
        format: formats[randomFormat] as MOVIE_FORMAT,
        language: 'en',
        startTime: startTime,
        endTime: endTime,
      });
    }
  }

  try {
    await sessionService.truncate();
    await sessionService.create(params);
  } catch (error) {
    console.log('Seed sessions fail!', error);
  }
  await app.close();
  process.exit(0);
};

seedSession();
