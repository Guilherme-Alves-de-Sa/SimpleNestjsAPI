import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoConfigModule } from './mongo.config.module';
import { MongoConfigService } from './mongo.config.service';

describe('AppConfigService', () => {
  let service: MongoConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongoConfigModule],
      providers: [MongoConfigService, ConfigService],
    }).compile();

    service = module.get<MongoConfigService>(MongoConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});