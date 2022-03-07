import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with mongo config based operations.
 *
 * @class
 */

type MongoConfigObject = {
  connection_string: string
  auth: {
    user: string,
    password: string
  },
  dbName: string,
}

@Injectable()
export class MongoConfigService {
  constructor(private configService: ConfigService) {}
  
  get connectionConfig(): MongoConfigObject {
    return this.configService.get<MongoConfigObject>('mongo');
  }
  
}