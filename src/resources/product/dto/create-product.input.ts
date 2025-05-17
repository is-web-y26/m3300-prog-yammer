import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Данные для создания товара' })
export class CreateProductInput {
  @Field({ description: 'Название товара' })
  name: string;

  @Field({ description: 'Цена товара в рублях' })
  price: number;

  @Field({ description: 'Описание товара' })
  description: string;

  @Field({ description: 'Ссылка на изображение' })
  imageUrl: string;

  @Field({ description: 'Название для команды выдачи' })
  nameForCommand: string;

  @Field({ description: 'ID подкатегории' })
  subcategoryId: number;
}
