import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Player, PlayerDocument } from '../schemas/player.schema';
import { PlayerRankItem } from '../schemas/player-rank.schema';
import { SexKind } from '../schemas/sex-kind.enum';

@Injectable()
export class RanksService {
  private readonly logger = new Logger(RanksService.name);

  constructor(
    @InjectModel(Player.name) private readonly model: Model<PlayerDocument>,
  ) {}

  async findAll(): Promise<{
    Male: PlayerRankItem[];
    Female: PlayerRankItem[];
  }> {
    const players = await this.model
      .find()
      .select('firstname lastname sex data.rank')
      .sort({ 'data.rank': 1 })
      .exec();

    const mapItems = (players) =>
      players.map((p) => ({
        rank: p.data.rank,
        firstname: p.firstname,
        lastname: p.lastname,
      }));

    const Male = mapItems(players.filter((p) => p.sex === SexKind.Male));
    const Female = mapItems(players.filter((p) => p.sex === SexKind.Female));

    this.logger.log(`Returning all players by rank: count=${players.length}`);
    return { Male, Female };
  }
  
}
