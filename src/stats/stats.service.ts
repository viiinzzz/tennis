import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Player, PlayerDocument } from '../schemas/player.schema';
import { CountryRatioItem } from '../schemas/country-ratio.schema';

import { group, median, bmi } from '../helpers';

@Injectable()
export class StatsService {
  private readonly logger = new Logger(StatsService.name);

  constructor(
    @InjectModel(Player.name) private readonly model: Model<PlayerDocument>,
  ) {}

  async countryWithBiggestWinRatio(): Promise<CountryRatioItem[]> {
    const players = await this.model.find().exec();

    const player_results = players.map((p) => ({
      win: p.data.last.filter((result) => result === 1).length,
      loose: p.data.last.filter((result) => result === 0).length,
      code: p.country.code,
    }));

    const country_results = group(player_results, (p) => p.code);
    if (!country_results.length) {
      return [];
    }

    const country_results2 = Object.keys(country_results).map((code) => ({
      code,
      win: country_results[code].map((c) => c.win).reduce((x, y) => x + y, 0),
      loose: country_results[code]
        .map((c) => c.loose)
        .reduce((x, y) => x + y, 0),
    }));

    const country_ranks = country_results2.map((c) => ({
      code: c.code,
      ratio:
        c.win + c.loose === 0
          ? 0
          : Number.parseFloat((c.win / (c.win + c.loose)).toFixed(2)),
    }));

    country_ranks.sort((x, y) => y.ratio - x.ratio);
    const country_ranks2 = country_ranks.map((c, i) => ({ ...c, rank: i + 1 }));

    const biggest_ratio = country_ranks2?.[0].ratio;

    this.logger.log(`Returning all countries by rank: count=${country_ranks2.length}`);

    const country_win = country_ranks2
      .filter((c) => c.ratio === biggest_ratio)
      .map((c) => ({ code: c.code, ratio: c.ratio }));

    return country_win;
  }

  async averagePlayerBMI(): Promise<number> {
    const players = await this.model.find().exec();

    const arr = players
      .filter((p) => p.data && p.data.weight > 0 && p.data.height > 0)
      .map((p) => bmi(p.data.weight * 0.001, p.data.height * 0.01));

    const avg =
      arr.length == 0 ? 0 : arr.reduce((x, y) => x + y, 0) / arr.length;

    this.logger.log(`Returning players average BMI: ${avg}`);
    return Number.parseFloat(avg.toFixed(1));
  }

  async medianPlayerHeight(): Promise<number> {
    const players = await this.model.find().exec();

    const arr = players
      .filter((p) => p.data.height > 0)
      .map((p) => p.data.height);

    const med = arr.length == 0 ? 0 : median(arr);

    this.logger.log(`Returning players median heigth: ${med}`);
    return med;
  }
}
