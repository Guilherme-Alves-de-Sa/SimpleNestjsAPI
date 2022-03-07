import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import * as Joi from 'joi';

import configuration from './auth.configuration';
import { AuthConfigService } from './auth.config.service';

/**
 * Import and provide auth configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        AUTH_JWTSECRET: Joi.string(),
        AUTH_JWTEXPIRES: Joi.string().default('60s'),
        AUTH_SELFSERVICE: Joi.string().default(false),
      }),
    }),
  ],
  providers: [ConfigService, AuthConfigService],
  exports: [AuthConfigService],
})
export class AuthConfigModule { }