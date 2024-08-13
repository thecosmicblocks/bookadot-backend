import {
  Controller,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';

import { SessionService } from './session.service';
import { TheatresService } from '../theatres/theatres.service';
import { FilterSessionDto } from './dtos/request.dto';
import { SuccessResponseDto } from './dtos/response.dto';
import { NotFoundResponseDto } from 'src/common/dtos/response.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('sessions')
@Controller('sessions')
export class SessionController {
  constructor(
    private sessionService: SessionService,
    private theatresService: TheatresService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SuccessResponseDto })
  async getSessions(
    @Query() params: FilterSessionDto,
  ): Promise<SuccessResponseDto | NotFoundResponseDto> {
    const { byCinema } = params;
    let response: any[] = [];
    let total: number = 0;
    let page: number = 0;
    let limit: number = 0;

    if (typeof(byCinema) !== 'undefined' && byCinema === 'true') {
      const result = await this.theatresService.getListByMovie(params);
      response = result.theatres;
      total = result.total;
      page = result.page;
      limit = result.limit;
    } else {
      const result = await this.sessionService.getList(params);
      response = result.sessions;
      total = result.total;
      page = result.page;
      limit = result.limit;
    }

    return new SuccessResponseDto({response, total, page, limit});
  }
}
