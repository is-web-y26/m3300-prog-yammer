import { InputType, Field } from '@nestjs/graphql';

@InputType({ description: 'Данные для создания категории' })
export class CreateSubcategoryInput {
  @Field({ description: 'Название подкатегории' })
  name: string;

  @Field({
    description:
      'Команда выдачи предмета (плейсхолдеры: %nickname%, %server%, %product%)',
  })
  giveCommand: string;

  @Field({ description: 'ID родительской категории' })
  categoryId: number;
}
