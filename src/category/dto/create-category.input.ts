import { InputType, Field } from '@nestjs/graphql';

@InputType({ description: 'Данные для создания категории' })
export class CreateCategoryInput {
  @Field({ description: 'Название категории' })
  name: string;

  @Field({ description: 'Имя сервера, к которой относится категория' })
  serverName: string;
}
