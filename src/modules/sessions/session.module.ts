import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SessionController } from './session.controller';
import { SessionEntity } from './session.entity';
import { SessionService } from './session.service';
import { TheatreEntity } from '../theatres/theatre.entity';
import { TheatresService } from '../theatres/theatres.service';

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntity, TheatreEntity])],
  controllers: [SessionController],
  exports: [SessionService, TheatresService],
  providers: [SessionService, TheatresService],
})
export class SessionModule {}
