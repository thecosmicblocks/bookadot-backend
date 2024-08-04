import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class FilterMovieDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  category_name?: string;
}

export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  movieUrl: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  trailerUrl: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  posterUrl: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  imdbRating: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  knopoiskRating: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  runtime: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  release: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  director: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  cast: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(init?: Partial<CreateMovieDto>) {
    Object.assign(this, init);
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
