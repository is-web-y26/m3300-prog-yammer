import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateCategoryInput } from './create-category.input';

@InputType({ description: 'Данные для обновления категории' })
export class UpdateCategoryInput extends CreateCategoryInput {
  @Field(() => Int, { description: 'ID категории' })
  id: number;
}
