import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Subcategory } from '../../subcategory/entities/subcategory.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType({ description: 'Категория товара' })
@Entity({ name: 'categories' })
export class Category {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Field(() => Int, { description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Выживание', description: 'Название категории' })
  @Field({ description: 'Название категории' })
  @Column()
  name: string;

  @ApiProperty({
    example: 'survival',
    description: 'Имя сервера, к которой относится категория',
  })
  @Field({ description: 'Имя сервера, к которой относится категория' })
  @Column({ name: 'server_name' })
  serverName: string;

  @ApiProperty({ type: () => [Subcategory], description: 'Подкатегории' })
  @Field(() => [Subcategory], { description: 'Подкатегории' })
  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];
}
