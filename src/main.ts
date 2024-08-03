import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { API_PREFIX, API_VERSION } from './constants/variables';
import helmet from 'helmet';
import * as compression from 'compression';
import {
  BadRequestException,
  Logger,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { setupSwagger } from './config/setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  app.setGlobalPrefix(`/${API_PREFIX}/${API_VERSION}`);
  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException(errors);
      },
    }),
  );

  setupSwagger(app);
  await app.listen(configService.get('app.port')).then(() => {
    Logger.log('Server listening on port ' + configService.get('app.port'));
  });
}
bootstrap();