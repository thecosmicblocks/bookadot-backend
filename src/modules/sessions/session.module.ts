import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SessionController } from './session.controller';
import { SessionEntity } from './entities/session.entity';
import { SessionService } from './session.service';
import { TheatresModule } from '../theatres/theatres.module';
import { MovieModule } from '../movies/movie.module';
import { SeatsModule } from '../seats/seats.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionEntity]),
    TheatresModule,
    MovieModule,
    SeatsModule,
  ],
  controllers: [SessionController],
  exports: [SessionService],
  providers: [SessionService],
})
export class SessionModule {}
