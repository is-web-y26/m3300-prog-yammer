import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ example: 'VIP', description: 'Название товара' })
  @IsString()
  name: string;

  @ApiProperty({ example: 78, description: 'Цена товара в рублях' })
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'Открывается доступ к команде /fly',
    description: 'Описание товара',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'images/vip.png',
    description: 'Ссылка на изображение',
  })
  @IsString()
  imageUrl: string;

  @ApiProperty({ example: 'vip', description: 'Название для команды выдачи' })
  @IsString()
  nameForCommand: string;

  @ApiProperty({ example: 1, description: 'ID подкатегории' })
  @Type(() => Number)
  @IsNumber()
  subcategoryId: number;
}
