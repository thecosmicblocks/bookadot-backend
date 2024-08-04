import { Module, INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MovieService } from 'src/modules/movies/movie.service';
import { CategoryService } from 'src/modules/categories/category.service';
import { AppModule } from 'src/app.module';

@Module({
  imports: [AppModule],
})
class CommandModule {}

export const seedMovie = async () => {
  const app: INestApplicationContext =
    await NestFactory.createApplicationContext(CommandModule);
  const movieService = app.get(MovieService);
  const categoryService = app.get(CategoryService);

  const movieData =
    await require('src/common/data-template/movies.json');
  const categories = await categoryService.getAll() ?? [];

  const params = [];
  for (let i = 0; i < movieData.length; i++) {
    const randomIndex = Math.floor(Math.random() * categories.length);

    params.push({
      categoryId: categories.length > 0 ? categories[randomIndex].id : 0,
      title: movieData[i].title,
      description: movieData[i].description,
      movieUrl: movieData[i].movie_url,
      trailerUrl: movieData[i].trailer_url,
      posterUrl: movieData[i].poster_url,
      imdbRating: movieData[i].imdb_rating,
      knopoiskRating: movieData[i].knopoisk_rating,
      certificate: movieData[i].certificate,
      runtime: movieData[i].runtime,
      release: movieData[i].release,
      director: movieData[i].director,
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
