import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';
import { AdminService } from './admin.service';

import * as PLAYERS_SEEDING from './playersSeeding.json';

@Controller('players')
@ApiTags('admin')
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Player created successfully.' })
  @ApiUnprocessableEntityResponse({ description: 'Player shortname exists.' })
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    console.log({ createPlayerDto });
    return await this.service.create(createPlayerDto);
  }

  @Put(':shortname')
  @ApiOkResponse({ description: 'Player updated successfully.' })
  @ApiNotFoundResponse({ description: 'Player not found.' })
  @ApiUnprocessableEntityResponse({
    description: 'Player shortname already exists.',
  })
  async update(
    @Param('shortname') shortname: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    return await this.service.update(shortname, updatePlayerDto);
  }

  @Delete(':shortname')
  @ApiOkResponse({ description: 'Player deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Player not found.' })
  async delete(@Param('shortname') shortname: string) {
    return await this.service.delete(shortname);
  }

  @Post('seed')
  @ApiCreatedResponse({ description: 'Players created successfully.' })
  @ApiUnprocessableEntityResponse({ description: 'Players shortname exists.' })
  async seed() {
    const players = PLAYERS_SEEDING.players;
    if (!players.length) {
      throw new Error('players seeding empty');
    }

    await Promise.all(
      players.map(async (player) => {
        const createPlayerDto = player as any as CreatePlayerDto;
        try {
          await this.service.create(createPlayerDto);
          console.log(' OK seed: ' + createPlayerDto);
        } catch (e) {
          console.log('ERR seed: ' + createPlayerDto);
        }
      }),
    );
  }
}
