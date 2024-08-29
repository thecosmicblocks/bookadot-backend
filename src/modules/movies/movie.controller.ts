import {
  Controller,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';

import { MovieService } from './movie.service';
import { FilterMovieDto } from './dtos/request.dto';
import { SuccessResponseDto } from './dtos/response.dto';
import { NotFoundResponseDto } from 'src/common/dtos/response.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SuccessResponseDto })
  async getMovies(
    @Query() params: FilterMovieDto,
  ): Promise<SuccessResponseDto | NotFoundResponseDto> {
    const { movies, total, page, limit } =
      await this.movieService.getMovies(params);

    return new SuccessResponseDto({ movies, total, page, limit });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SuccessResponseDto })
  async getMovieDetail(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<SuccessResponseDto | NotFoundResponseDto> {
    try {
      const movie = await this.movieService.getMovieById(id);
      return new SuccessResponseDto(movie);
    } catch (error) {
      return new NotFoundResponseDto(error.message);
    }
  }
}
