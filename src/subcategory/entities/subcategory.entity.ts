import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Product } from '../../product/entities/product.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

export enum CheckMethod {
  NOT_NEED = 'not_need',
  HAVING = 'having',
  HAVING_MORE = 'having_more',
}

@ObjectType({ description: 'Гонщик команды' })
@Entity({ name: 'subcategories' })
export class Subcategory {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Field(() => Int, { description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'icon_rl', nullable: true })
  iconUrl: string;

  @Column({
    name: 'check_method',
    type: 'enum',
    enum: CheckMethod,
    default: CheckMethod.NOT_NEED,
  })
  checkMethod: CheckMethod;

  @Column({ name: 'give_command', })
  giveCommand: string;

  @ManyToOne(() => Category, category => category.subcategories, { onDelete: 'CASCADE' })
  category: Category;

  @OneToMany(() => Product, product => product.subcategory)
  products: Product[];
}