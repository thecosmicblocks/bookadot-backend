import { Module } from '@nestjs/common';
import { TheatresService } from './theatres.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheatreEntity } from './theatre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TheatreEntity])],
  providers: [TheatresService],
  exports: [TheatresService],
})
export class TheatresModule {}
