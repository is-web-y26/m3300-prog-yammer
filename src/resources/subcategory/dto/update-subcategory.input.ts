import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateSubcategoryInput } from './create-subcategory.input';

@InputType({ description: 'Данные для обновления подкатегории' })
export class UpdateSubcategoryInput extends CreateSubcategoryInput {
  @Field(() => Int, { description: 'ID подкатегории' })
  id: number;
}
