import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../player/entities/player.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  create(createPlayerDto: CreatePlayerDto) {
    const player = this.playerRepository.create(createPlayerDto);
    return this.playerRepository.save(player);
  }

  async findAll() {
    return await this.playerRepository.find({ relations: ['subcategories'] });
  }

  async findOne(id: number) {
    const player = await this.playerRepository.findOne({
      where: { id },
    });
    if (!player) throw new NotFoundException(`Player ${id} not found`);
    return player;
  }

  async findOneByNickname(nickname: string) {
    const player = await this.playerRepository.findOneBy({
      nickname: nickname,
    });
    if (!player)
      throw new NotFoundException(`Player with nickname ${nickname} not found`);
    return player;
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    const player = await this.playerRepository.preload({
      id,
      ...updatePlayerDto,
    });
    if (!player) throw new NotFoundException(`Player ${id} not found`);
    return this.playerRepository.save(player);
  }

  async remove(id: number) {
    const result = await this.playerRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Player not found');
  }
}
