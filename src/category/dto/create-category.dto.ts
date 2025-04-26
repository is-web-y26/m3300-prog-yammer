import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: "Выживание", description: 'Название категории' })
  @IsString()
  name: string;

  @ApiProperty({ example: "survival", description: 'Имя сервера, к которой относится категория' })
  @IsString()
  serverName: string;
}
