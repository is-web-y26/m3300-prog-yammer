import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Coupon } from '../../coupon/entities/coupon.entity';
import { Payment } from '../../payment/entities/payment.entity';

@Entity({ name: 'players' })
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nickname: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Coupon, (coupon) => coupon.playerOwner)
  coupons: Coupon[];

  @OneToMany(() => Payment, (payment) => payment.player)
  payments: Payment[];
}
