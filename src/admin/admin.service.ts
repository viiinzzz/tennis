import {
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';
import { Player, PlayerDocument } from '../schemas/player.schema';
import {
  PlayerRankItem,
  PlayerRankWithSexItem,
} from '../schemas/player-rank.schema';
import { SexKind } from '../schemas/sex-kind.enum';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

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

  async findOne(shortname: string): Promise<PlayerRankWithSexItem> {
    const player = await this.model
      .findById(shortname, 'firstname lastname sex data.rank')
      .exec();

    if (!player) {
      this.logger.log(`Player not found: shortname=${shortname}`);
      throw new NotFoundException('Player not found.');
    }

    const mapItem = (p) => ({
      sex: p.sex,
      rank: p.data.rank,
      firstname: p.firstname,
      lastname: p.lastname,
    });

    return mapItem(player);
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const player = await new this.model({
      ...createPlayerDto,
      createdAt: new Date(),
    }).save();

    this.logger.log(`Player created: shortname=${player._id}`);

    return player;
  }

  async update(
    shortname: string,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<Player> {
    const player = await this.model
      .findByIdAndUpdate(shortname, updatePlayerDto)
      .exec();

    this.logger.log(`Player updated: shortname=${player._id}`);

    return player;
  }

  async delete(shortname: string): Promise<Player> {
    const player = await this.model.findByIdAndDelete(shortname).exec();

    this.logger.log(`Player deleted: shortname=${player._id}`);

    return player;
  }
}
