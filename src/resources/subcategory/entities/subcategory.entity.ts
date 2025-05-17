import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany, JoinColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Product } from '../../product/entities/product.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType({ description: 'Подкатегория товара' })
@Entity({ name: 'subcategories' })
export class Subcategory {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Field(() => Int, { description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Привилегии', description: 'Название подкатегории' })
  @Field({ description: 'Название подкатегории' })
  @Column()
  name: string;

  @ApiProperty({
    example: 'lp user %nickname% parent add %product% server=%server%',
    description:
      'Команда выдачи предмета (плейсхолдеры: %nickname%, %server%, %product%)',
  })
  @Field({
    description:
      'Команда выдачи предмета (плейсхолдеры: %nickname%, %server%, %product%)',
  })
  @Column({ name: 'give_command' })
  giveCommand: string;

  @ApiProperty({ type: () => Category, description: 'Родительская категория' })
  @Field((type) => Category, { description: 'Родительская категория' })
  @ManyToOne(() => Category, (category) => category.subcategories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ApiProperty({ type: () => [Product], description: 'Товары в подкатегории' })
  @Field((type) => [Product], { description: 'Товары в подкатегории' })
  @OneToMany(() => Product, (product) => product.subcategory)
  products: Product[];
}
