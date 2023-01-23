import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Player, PlayerDocument } from '../schemas/player.schema';

@Injectable()
export class DetailsService {
  private readonly logger = new Logger(DetailsService.name);

  constructor(
    @InjectModel(Player.name) private readonly model: Model<PlayerDocument>,
  ) {}

  async findOne(shortname: string): Promise<Player> {
    const player = await this.model.findById(shortname).exec();

    if (!player) {
      this.logger.log(`Player not found: shortname=${shortname}`);
      throw new NotFoundException('Player not found.');
    }

    const mapItem = (p) => {
      const shortname = p._id;
      delete p._doc.data._doc._id;
      delete p._doc._id;
      return { shortname, ...p._doc };
    };

    return mapItem(player);
  }
}
