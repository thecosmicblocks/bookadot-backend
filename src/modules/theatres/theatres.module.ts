import { Module } from '@nestjs/common';
import { TheatresService } from './theatres.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheatreEntity } from './entities/theatre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TheatreEntity])],
  providers: [TheatresService],
  exports: [TheatresService],
})
export class TheatresModule {}
