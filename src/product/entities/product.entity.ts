import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Subcategory } from '../../subcategory/entities/subcategory.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  description: string;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column({ name: 'created_at' })
  @CreateDateColumn()
  createdAt: Date;

  @Column({ name: 'updated_at' })
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ name: 'name_for_command' })
  nameForCommand: string;

  @ManyToOne(() => Subcategory, subcategory => subcategory.products, { onDelete: 'CASCADE' })
  subcategory: Subcategory;
}
