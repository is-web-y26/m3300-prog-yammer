import { InputType, Field } from '@nestjs/graphql';
import { CheckMethod } from '../entities/subcategory.entity';

@InputType({ description: 'Данные для создания категории' })
export class CreateSubcategoryInput {
  @Field({ description: 'Название подкатегории' })
  name: string;

  @Field({ description: 'Настройка доступности покупки для игрока', })
  checkMethod?: CheckMethod = CheckMethod.NOT_NEED;

  @Field({
    description:
      'Команда выдачи предмета (плейсхолдеры: %nickname%, %server%, %product%)',
  })
  giveCommand: string;

  @Field({ description: 'ID родительской категории' })
  categoryId: number;
}
