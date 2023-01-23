import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { RanksModule } from './ranks/ranks.module';
import { DetailsModule } from './details/details.module';
import { StatsModule } from './stats/stats.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        const MONGODB_URL =
          process.env.MONGODB_URL ?? 'mongodb://localhost/tennis';
        console.log({
          MONGODB_URL: MONGODB_URL.replace(/(\/\/[^:]:)[^@]/, '<password>'),
        });

        return {
          uri: MONGODB_URL,

          authSource: 'admin',
          useNewUrlParser: true,
          useUnifiedTopology: true,
          loggerLevel: 'debug',
          authMechanism: 'SCRAM',
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    RanksModule,
    DetailsModule,
    StatsModule,
    AdminModule,
  ],
})
export class AppModule {}
