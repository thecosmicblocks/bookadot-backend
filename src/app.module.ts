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
  ],
})
export class AppModule {}
