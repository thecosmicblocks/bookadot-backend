import { Module, INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SessionService } from 'src/modules/sessions/session.service';
import { AppModule } from 'src/app.module';

@Module({
  imports: [AppModule],
})
class CommandModule {}

export const seedSession = async () => {
  const app: INestApplicationContext =
    await NestFactory.createApplicationContext(CommandModule);
  const sessionService = app.get(SessionService);

  try {
    await sessionService.truncate();
    await sessionService.seed();
  } catch (error) {
    console.log(error);
  }

  await app.close();
  process.exit(0);
};

seedSession();
