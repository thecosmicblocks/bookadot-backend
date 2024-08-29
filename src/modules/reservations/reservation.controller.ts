import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
// import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

import {} from './reservation.service';
import {} from 'src/common/dtos/response.dto';

@ApiTags('reservations')
@Controller('reservations')
export class ReservationController {
  constructor() {}
}
