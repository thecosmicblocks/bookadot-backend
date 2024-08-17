import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

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

export class FilterListDto {
  @ApiProperty({required: true})
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsUUID()
  sessionId: string;
}

export class FilterDetailDto {
  @ApiProperty({required: true})
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({required: true})
  @IsNotEmpty()
  @IsUUID()
  reservationId: string;

  @ApiProperty({required: true})
  @IsNotEmpty()
  @IsUUID()
  reservationInfoId: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsUUID()
  sessionId: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsUUID()
  ticketId: string;
}
