import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { AppModule } from './app/app.module';

// CLI ENTRY POINT FOR NESTJS COMMANDS

(async () => {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false
  });
  app
    .select(CommandModule)
    .get(CommandService)
    .exec();
})();