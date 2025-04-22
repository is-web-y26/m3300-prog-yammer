import { ApiProperty } from '@nestjs/swagger';
import { CheckMethod } from '../entities/subcategory.entity';

export class CreateSubcategoryDto {
  @ApiProperty({ example: 'Привилегии', description: 'Название подкатегории' })
  name: string;

  @ApiProperty({ example: CheckMethod.HAVING, description: 'Настройка доступности покупки для игрока', })
  checkMethod?: CheckMethod = CheckMethod.NOT_NEED;

  @ApiProperty({
    example: 'lp user %nickname% parent add %product% server=%server%',
    description:
      'Команда выдачи предмета (плейсхолдеры: %nickname%, %server%, %product%)',
  })
  giveCommand: string;

  @ApiProperty({ example: 1, description: 'ID родительской категории', })
  categoryId: number;
}
