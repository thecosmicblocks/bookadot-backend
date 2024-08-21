import {
  Controller,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  Query,
  Post,
  UseGuards,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FilterDetailDto, FilterListDto } from './dtos/request.dto';
// import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

import { ReservationService } from './reservation.service';
import {
  ErrorResponseDto,
  NotFoundResponseDto,
  SuccessResponseDto,
} from 'src/common/dtos/response.dto';
import { PurchaseTicketRequest } from './dtos/request.dto';

@ApiTags('reservations')
@Controller('reservations')
export class ReservationController {
  constructor(
    private reservationService: ReservationService,
  ) {}

  @Post('/purchase-tickets')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiBadRequestResponse({ description: 'Purchase tickets Error.' })
  async purchaseTicket(
    // @UserParams() requestData,
    @Body() body: PurchaseTicketRequest,
  ) {
    const { sessionId, ticketInfos, totalPrice } = body;
    try {
      const result = await this.reservationService.storeTicketPurchase(
        sessionId,
        ticketInfos,
        totalPrice,
      );

      if (result) {
        return new SuccessResponseDto(result);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return new ErrorResponseDto();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SuccessResponseDto })
  async getList(
    // @UserParams() requestData,
    @Query() params: FilterListDto,
  ): Promise<SuccessResponseDto | NotFoundResponseDto> {
    const reservations = await this.reservationService.getReservations(params);

    return new SuccessResponseDto(reservations);
  }

  @Get('/purchase-ticket-detail')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SuccessResponseDto })
  async getDetail(
    // @UserParams() requestData,
    @Query() params: FilterDetailDto,
  ): Promise<SuccessResponseDto | NotFoundResponseDto> {
    const reservations = await this.reservationService.getReservationDetail(params);

    return new SuccessResponseDto(reservations);
  }
}
