import { Controller, Post, Body } from '@nestjs/common';
import { BookingService } from '../services/booking.service';
import { BigNumber } from 'ethers';

class GenerateBookingDto {
  bookingId: string;
  bookingAmount: string; // Use string to pass large numbers
  token: string;
  chainId: number;
  bookadotPropertyAddress: string;
}

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('generate')
  async generateBookingParam(@Body() dto: GenerateBookingDto) {
    const bookingAmount = BigNumber.from(dto.bookingAmount);

    const signer = {
      _signTypedData: async (...params) => {
        // Implement signing logic using ethers or inject a real signer here
        return 'signature_placeholder';
      },
    };

    const config = {
      chainId: dto.chainId,
      bookadotPropertyAddress: dto.bookadotPropertyAddress,
    };

    return this.bookingService.generateBookingParam(
      dto.bookingId,
      bookingAmount,
      signer,
      dto.token,
      config,
    );
  }
}
