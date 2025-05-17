import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CacheControl } from '../../interceptors/etag.interceptor';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';

@ApiTags('Player')
@Controller('api/player')
@UseInterceptors(new CacheControl())
export class PlayerApiController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @ApiOperation({ summary: 'Добавить нового игрока' })
  @ApiBody({
    description: 'Данные для создания игрока',
    type: CreatePlayerDto,
  })
  @ApiResponse({ status: 201, description: 'Игрок успешно создан' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.create(createPlayerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех игроков' })
  @ApiResponse({
    status: 200,
    description: 'Список игроков',
    type: [Player],
  })
  findAll() {
    return this.playerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить данные игрока по ID' })
  @ApiResponse({
    status: 200,
    description: 'Найденный игрок',
    type: Player,
  })
  @ApiResponse({ status: 404, description: 'Игрок не найден' })
  findOne(@Param('id') id: number) {
    return this.playerService.findOne(+id);
  }

  @Get('nickname/:nickname')
  @ApiOperation({ summary: 'Получить данные игрока по никнейму' })
  @ApiResponse({
    status: 200,
    description: 'Найденный игрок',
    type: Player,
  })
  @ApiResponse({ status: 404, description: 'Игрок не найден' })
  findOneByNickname(@Param('nickname') nickname: string) {
    const start = Date.now();
    while (Date.now() - start < 2000) {}
    return this.playerService.findOneByNickname(nickname);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить данные игрока' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID купон',
  })
  @ApiBody({
    description: 'Данные для обновления игрока',
    type: UpdatePlayerDto,
  })
  @ApiResponse({ status: 200, description: 'Игрок обновлен' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  update(@Param('id') id: number, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playerService.update(+id, updatePlayerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить игрока' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID игрока',
  })
  @ApiResponse({ status: 200, description: 'Игрок удален' })
  @ApiResponse({ status: 404, description: 'Игрок не найден' })
  async remove(@Param('id') id: number) {
    await this.playerService.remove(+id);
    return { status: 'OK' };
  }
}
