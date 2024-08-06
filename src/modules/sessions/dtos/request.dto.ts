import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional, IsIn, IsDateString, IsBoolean } from 'class-validator';
import { Order } from 'src/constants';
import * as moment from 'moment';

const currentDate = moment().format('YYYY/MM/DD');
export class FilterSessionDto {

  @ApiProperty({ required: true })
  @IsString()
  movieId?: string;

  @ApiProperty({ required: false, default: currentDate })
  @IsOptional()
  @IsDateString()
  date?: Date;

  @ApiProperty({ required: false, default: 'ASC' })
  @IsOptional()
  @IsString()
  @IsIn(Object.values(Order))
  orderTimeType?: string;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsString()
  @IsIn(['true', 'false'])
  byCinema?: string;
}

export class CreateSessionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  movieId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  theatreId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  format: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  language: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  adultPrice: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  childPrice: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  studentPrice: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  vipPrice: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  startTime: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  endTime: Date;

  createdAt: Date;
  updatedAt: Date;

  constructor(init?: Partial<CreateSessionDto>) {
    Object.assign(this, init);
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
