import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({ example: 'prog.yammer', description: 'Никнейм игрока' })
  @IsString()
  nickname: string;
}
