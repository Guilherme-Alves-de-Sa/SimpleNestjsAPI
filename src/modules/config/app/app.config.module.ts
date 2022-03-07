import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import configuration from './app.configuration';
import { AppConfigService } from './app.config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        APP_NAME: Joi.string().default('MyApp'),
        APP_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development'),
        APP_URL: Joi.string().default('http://127.0.0.1'),
        APP_PORT: Joi.number().default(9000),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule { }