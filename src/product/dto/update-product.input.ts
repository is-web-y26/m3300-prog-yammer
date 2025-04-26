import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateProductInput } from './create-product.input';

@InputType({ description: 'Данные для обновления товара' })
export class UpdateProductInput extends CreateProductInput {
  @Field(() => Int, { description: 'ID товара' })
  id: number;
}
