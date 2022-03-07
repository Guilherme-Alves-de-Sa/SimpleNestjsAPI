import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthConfigService } from './auth.config.service';

describe('AuthConfigService', () => {
  let service: AuthConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthConfigService, ConfigService],
    }).compile();

    service = module.get<AuthConfigService>(AuthConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have private secret', () => {
    expect(service.jwtSecretKey.length).toBeGreaterThan(0);
  })

  it('should have expires in value.', () => {
    expect(service.jwtExpiresIn.length).toBeGreaterThan(0);
  })
});