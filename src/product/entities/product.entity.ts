import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Subcategory } from '../../subcategory/entities/subcategory.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType({ description: 'Товар' })
@Entity({ name: 'products' })
export class Product {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Field(() => Int, { description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'VIP', description: 'Название товара' })
  @Field({ description: 'Название товара' })
  @Column()
  name: string;

  @ApiProperty({ example: 78, description: 'Цена товара в рублях' })
  @Field({ description: 'Цена товара в рублях' })
  @Column('decimal')
  price: number;

  @ApiProperty({ example: 'Открывается доступ к команде /fly', description: 'Описание товара' })
  @Field({ description: 'Описание товара' })
  @Column()
  description: string;

  @ApiProperty({
    example: 'images/vip.png',
    description: 'Ссылка на изображение',
  })
  @Field({ description: 'Ссылка на изображение' })
  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @ApiProperty({ example: new Date(), description: 'Дата создания товара' })
  @Field({ description: 'Дата создания товара' })
  @Column({ name: 'created_at' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: new Date(), description: 'Дата обновления товара' })
  @Field({ description: 'Дата обновления товара' })
  @Column({ name: 'updated_at' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ example: 'vip', description: 'Название для команды выдачи' })
  @Field({ description: 'Ссылка на иконку' })
  @Column({ name: 'name_for_command' })
  nameForCommand: string;

  @ApiProperty({ type: () => Subcategory, description: 'Подкатегория' })
  @Field((type) => Subcategory, { description: 'Подкатегория' })
  @ManyToOne(() => Subcategory, subcategory => subcategory.products, { onDelete: 'CASCADE' })
  subcategory: Subcategory;
}
