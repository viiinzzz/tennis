import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RanksService } from './ranks.service';
import { RanksController } from './ranks.controller';
import { Player, PlayerSchema } from '../schemas/player.schema';

@Module({
  providers: [RanksService],
  controllers: [RanksController],
  imports: [
    MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
  ],
})
export class RanksModule {}
