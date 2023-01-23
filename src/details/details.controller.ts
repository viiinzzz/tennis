import { Controller, Get, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { DetailsService } from './details.service';

@Controller('details')
@ApiTags('task#2')
export class DetailsController {
  constructor(private readonly service: DetailsService) {}

  @Get(':shortname')
  @ApiOkResponse({ description: 'Player retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Player not found.' })
  async find(@Param('shortname') shortname: string) {
    return await this.service.findOne(shortname);
  }
}
