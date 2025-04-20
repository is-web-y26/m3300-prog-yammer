import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType({ description: 'Данные для обновления категории' })
export class UpdateCategoryInput extends PartialType(CreateCategoryDto) {
  @Field(() => Int, { description: 'ID категории' })
  id: number;
}
