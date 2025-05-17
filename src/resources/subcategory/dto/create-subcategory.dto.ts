import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSubcategoryDto {
  @ApiProperty({ example: 'Привилегии', description: 'Название подкатегории' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'lp user %nickname% parent add %product% server=%server%',
    description:
      'Команда выдачи предмета (плейсхолдеры: %nickname%, %server%, %product%)',
  })
  @IsString()
  giveCommand: string;

  @ApiProperty({ example: 1, description: 'ID родительской категории' })
  @Type(() => Number)
  @IsNumber()
  categoryId: number;
}
