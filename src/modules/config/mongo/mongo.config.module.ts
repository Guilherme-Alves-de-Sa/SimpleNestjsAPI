import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import configuration from './mongo.configuration';
import { MongoConfigService } from './mongo.config.service';
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
        MONGO_CONNSTR: Joi.string().default(''),
      }),
    }),
  ],
  providers: [ConfigService, MongoConfigService],
  exports: [MongoConfigService],
})
export class MongoConfigModule {}