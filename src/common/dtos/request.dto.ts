import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetListPaginateDto {
  @ApiPropertyOptional()
  @IsOptional()
  pageIndex: number;

  @ApiPropertyOptional()
  @IsOptional()
  pageSize: number;
}
