import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: "Выживание", description: 'Название категории' })
  name: string;

  @ApiProperty({ example: "survival", description: 'Имя сервера, к которой относится категория' })
  serverName: string;
}
