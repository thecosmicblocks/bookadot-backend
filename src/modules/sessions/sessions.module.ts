import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from './entities/session.entity';
import { TheatresModule } from '../theatres/theatres.module';
import { MovieModule } from '../movies/movie.module';
import { SeatsModule } from '../seats/seats.module';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionEntity]),
    TheatresModule,
    MovieModule,
    SeatsModule,
  ],
  controllers: [SessionsController],
  exports: [SessionsService],
  providers: [SessionsService],
})
export class SessionsModule {}
