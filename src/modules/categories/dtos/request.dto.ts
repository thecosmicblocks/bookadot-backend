import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(init?: Partial<CreateCategoryDto>) {
    Object.assign(this, init);
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
