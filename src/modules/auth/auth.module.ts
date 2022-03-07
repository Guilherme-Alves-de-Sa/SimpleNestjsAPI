import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';

import { UserModule } from '../user/user.module';
import { AuthConfigModule } from '../config/auth/auth.config.module';

import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';

import { AuthConfigService } from '../config/auth/auth.config.service';
import { UserAuthService } from '../user/user.service';

import { UserEntity, UserEntitySchema } from '../user/user.entity';

@Module({
  imports: [
    AuthConfigModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [AuthConfigModule],
      useFactory: (authConfig: AuthConfigService) => ({
        secret: authConfig.jwtSecretKey,
        signOptions: { expiresIn: authConfig.jwtExpiresIn }
      }),
      inject: [AuthConfigService]
    }),
    NestjsQueryMongooseModule.forFeature([
      { document: UserEntity, name: UserEntity.name, schema: UserEntitySchema },
    ]),
  ],
  providers: [AuthService, UserAuthService, AuthResolver, LocalStrategy, JwtStrategy],
  //exports: [AuthService]
})
export class AuthModule { }

