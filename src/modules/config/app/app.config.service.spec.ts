import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigModule } from './app.config.module';
import { AppConfigService } from './app.config.service';

describe('AppConfigService', () => {
  let service: AppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppConfigModule],
      providers: [AppConfigService, ConfigService],
    }).compile();

    service = module.get<AppConfigService>(AppConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have title', () => {
    expect(service.name.length).toBeGreaterThan(0);
  });

  it('should have port', () => {
    expect(service.port).toBeDefined();
    expect(service.port !== 9000).toBeTruthy;
  });
});
