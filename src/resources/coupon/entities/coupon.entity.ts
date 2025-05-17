import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from '../../player/entities/player.entity';

@Entity({ name: 'coupons' })
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @ManyToOne(() => Player, (player) => player.coupons, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'player_owner_id' })
  playerOwner: Player | null = null;

  @Column('decimal')
  discount: number;

  @Column('decimal', { nullable: true })
  count: number | null = null;

  @Column({ type: 'timestamp', name: 'valid_from', default: new Date() })
  validFrom: Date;

  @Column({ type: 'timestamp', name: 'valid_to' })
  validTo: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean = true;
}
