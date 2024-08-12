import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class SeedDto {
  @ApiProperty({ description: 'The ID to seed the data with' })
  @IsString()
  @IsUUID()
  id: string;
}
