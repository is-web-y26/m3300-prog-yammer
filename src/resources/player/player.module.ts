import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PlayerApiController } from './player-api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player]), PlayerModule],
  controllers: [PlayerController, PlayerApiController],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
