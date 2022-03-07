import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with mongo config based operations.
 *
 * @class
 */
@Injectable()
export class AuthConfigService {
  constructor(private configService: ConfigService) {}
  
  get jwtSecretKey(): string {
    return this.configService.get<string>('auth.jwt_secret_key');
  }

  get jwtExpiresIn(): string {
    return this.configService.get<string>('auth.jwt_expires_in');
  }

  get authSelfService() : boolean {
    return this.configService.get<boolean>('auth.self_service');
  }
}