import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Subcategory } from './subcategory.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'icon_url' })
  iconUrl: string;

  @Column({ name: 'server_name' })
  serverName: string;

  @OneToMany(() => Subcategory, subcategory => subcategory.category)
  subcategories: Subcategory[];
}
