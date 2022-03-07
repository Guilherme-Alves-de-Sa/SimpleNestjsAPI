import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrapper');

  const app = await NestFactory.create(AppModule);
  await app.init();

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
  logger.log(`App connected to ${process.env.APP_ENV} database`);
  
  logger.log(`App listening on port ${process.env.PORT}`);
}
bootstrap();
