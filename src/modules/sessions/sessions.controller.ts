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

@Controller('sessions')
export class MovieController {
  constructor(private movieService: MovieService) {}
}
