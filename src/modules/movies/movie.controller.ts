import {
  Controller,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { MovieService } from './movie.service';
import { FilterMovieDto } from './dtos/request.dto';
import { SuccessResponseDto } from './dtos/response.dto';
import { NotFoundResponseDto } from 'src/common/dtos/response.dto';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getMovies(
    @Body() params: FilterMovieDto,
  ): Promise<SuccessResponseDto | NotFoundResponseDto> {
    const movies = await this.movieService.getMovies(params);
    if (movies.length > 0) {
      return new SuccessResponseDto(movies);
    }

    return new NotFoundResponseDto();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getMovieDetail(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto | NotFoundResponseDto> {
    try {
      const movie = await this.movieService.getMovieById(id);
      return new SuccessResponseDto(movie);
    } catch (error) {
      return new NotFoundResponseDto(error.message);
    }
  }
}
