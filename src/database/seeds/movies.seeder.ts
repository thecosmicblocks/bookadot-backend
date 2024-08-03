import { Module, INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MovieService } from 'src/modules/movies/movie.service';
import { AppModule } from 'src/app.module';

@Module({
  imports: [AppModule],
})
class CommandModule {}

export const seedMovie = async () => {
  const app: INestApplicationContext =
    await NestFactory.createApplicationContext(CommandModule);
  const movieService = app.get(MovieService);

  const MovieData =
    await require('src/common/data-template/movies.json');
  const params = [];
  for (let i = 0; i < MovieData.length; i++) {
    params.push({
      title: MovieData[i].title,
      description: MovieData[i].description,
      movieUrl: MovieData[i].movie_url,
      trailerUrl: MovieData[i].trailer_url,
      posterUrl: MovieData[i].poster_url,
      imdbRating: MovieData[i].imdb_rating,
      knopoiskRating: MovieData[i].knopoisk_rating,
      certificate: MovieData[i].certificate,
      runtime: MovieData[i].runtime,
      release: MovieData[i].release,
      director: MovieData[i].director,
    });
  }

  try {
    await movieService.truncate();
    await movieService.create(params);
  } catch (error) {
    console.log('Seed movies fail!', error);
  }
  await app.close();
  process.exit(0);
};

seedMovie();
