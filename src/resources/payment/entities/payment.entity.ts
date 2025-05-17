import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Player } from '../../player/entities/player.entity';
import { Coupon } from '../../coupon/entities/coupon.entity';
import { Product } from '../../product/entities/product.entity';

export enum PaymentStatus {
  CANCELED = 'canceled',
  WAITING = 'waiting',
  SUCCESS = 'success',
}

export enum PaymentMethod {
  MIR = 'mir',
  SBP = 'sbp',
  T_PAY = 't-pay',
  YANDEX_PAY = 'yandex-pay',
  YOOMONEY = 'yoomoney',
}

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, (player) => player.payments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @ManyToOne(() => Coupon, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'coupon_id' })
  coupon: Coupon | null;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column('decimal')
  amount: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.WAITING,
  })
  status: PaymentStatus = PaymentStatus.WAITING;

  @Column({
    name: 'method',
    type: 'enum',
    enum: PaymentMethod,
  })
  method: PaymentMethod;

  @Column()
  url: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
