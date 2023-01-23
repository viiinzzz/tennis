import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RanksModule } from './ranks/ranks.module';
import { DetailsModule } from './details/details.module';
import { StatsModule } from './stats/stats.module';
import { AdminModule } from './admin/admin.module';

const MONGODB_URL = process.env.MONGODB_URL ?? 'mongodb://localhost/tennis';
console.log({ MONGODB_URL });

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URL),
    RanksModule,
    DetailsModule,
    StatsModule,
    AdminModule,
  ],
})
export class AppModule {}
