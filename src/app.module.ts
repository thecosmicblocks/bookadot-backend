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
import { ShowTimesModule } from './modules/show-times/show-times.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { SeatsModule } from './modules/seats/seats.module';
import { ReservationsModule } from './modules/reservations/reservations.module';

const Modules = [MovieModule, CategoryModule, TheatresModule, AuthModule];
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    ...Modules,
    UsersModule,
    ShowTimesModule,
    TicketsModule,
    SeatsModule,
    ReservationsModule,
  ],
})
export class AppModule {}
