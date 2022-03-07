import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { AppConfigModule } from '../modules/config/app/app.config.module';
import { MongoConfigModule } from '../modules/config/mongo/mongo.config.module';
import { MongoConfigService } from '../modules/config/mongo/mongo.config.service';

import { AuthModule } from '../modules/auth/auth.module';
import { UserModule } from '../modules/user/user.module';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [

    // LOAD APP CONFIGURATION
    AppConfigModule,

    // DATABASE CONNECTION
    MongooseModule.forRootAsync({
      imports: [MongoConfigModule],
      useFactory: (mongoConfig: MongoConfigService) => ({
        uri: mongoConfig.connectionConfig.connection_string,
        autoIndex: true,
        useCreateIndex: true,
        auth: process.env.APP_ENV == "production" ? mongoConfig.connectionConfig.auth : null,
        dbName: process.env.APP_ENV == "production" ? mongoConfig.connectionConfig.dbName : null,
      }),
      inject: [MongoConfigService]
    }),

    // AUTH MODULE
    AuthModule,

    // GRAPHQL MODULE 
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      debug: false,
      context: ({req}) => ({ req })
    }),

    // ENTITY MODULES
    UserModule,

    // OTHER MODULES
    CommandModule,
  ],
})
export class AppModule { }
