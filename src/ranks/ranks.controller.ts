import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RanksService } from './ranks.service';

@Controller('ranks')
@ApiTags('task#1')
export class RanksController {
  constructor(private readonly service: RanksService) {}

  @Get()
  @ApiOkResponse({ description: 'Ranks retrieved successfully.' })
  async index() {
    return await this.service.findAll();
  }
}
