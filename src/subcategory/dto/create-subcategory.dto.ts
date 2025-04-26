import { ApiProperty } from '@nestjs/swagger';
import { CheckMethod } from '../entities/subcategory.entity';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSubcategoryDto {
  @ApiProperty({ example: 'Привилегии', description: 'Название подкатегории' })
  @IsString()
  name: string;

  @ApiProperty({
    example: CheckMethod.HAVING,
    enum: CheckMethod,
    enumName: 'CheckMethod',
    description: 'Настройка доступности покупки для игрока',
  })
  @IsEnum(CheckMethod, {
    message: `Роль должна быть одним из: ${Object.values(CheckMethod).join(', ')}`,
  })
  checkMethod?: CheckMethod = CheckMethod.NOT_NEED;

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
