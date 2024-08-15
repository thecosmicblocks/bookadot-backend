import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class PurchaseTicketRequest {
  @ApiProperty({required: true})
  @IsNotEmpty()
  @IsUUID()
  sessionId: string;

  @ApiProperty({required: true})
  @IsNotEmpty()
  ticketInfos: any[];

  @ApiProperty({required: true})
  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;
}
