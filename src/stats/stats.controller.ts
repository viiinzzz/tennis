import { Controller, Get, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { StatsService } from './stats.service';

@Controller('stats')
@ApiTags('task#3')
export class StatsController {
  constructor(private readonly service: StatsService) {}

  @Get()
  @ApiOkResponse({ description: 'Country ranks retrieved successfully.' })
  async index() {
    const country = await this.service.countryWithBiggestWinRatio();
    const averageBMI = await this.service.averagePlayerBMI();
    const medianHeight = await this.service.medianPlayerHeight();

    return {
      country: {
        bestWinRatio: country,
      },
      player: {
        averageBMI,
        medianHeight,
      },
    };
  }
}
