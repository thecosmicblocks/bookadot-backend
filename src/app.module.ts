import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import { TheatresModule } from './modules/theatres/theatres.module';
import { MovieModule } from './modules/movies/movie.module';
import { CategoryModule } from './modules/categories/category.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SeatsModule } from './modules/seats/seats.module';
import { ReservationModule } from './modules/reservations/reservation.module';

import { SessionModule } from './modules/sessions/session.module';
import { TicketModule } from './modules/tickets/ticket.module';
import { ReservationInfoModule } from './modules/reservation-infos/reservation-info.module';

const Modules = [
  MovieModule,
  UsersModule,
  CategoryModule,
  TheatresModule,
  AuthModule,
  SeatsModule,
  ReservationModule,
  SessionModule,
  TicketModule,
  ReservationInfoModule,
];
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    ...Modules
  ],
})
export class AppModule {}
