import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity';
import { Player } from '../player/entities/player.entity';
import { Coupon } from '../coupon/entities/coupon.entity';
import { Payment } from './entities/payment.entity';
import { PaymentController } from './payment.controller';
import { PaymentApiController } from './payment-api.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Player]),
    TypeOrmModule.forFeature([Coupon]),
    TypeOrmModule.forFeature([Payment]),
    PaymentModule,
  ],
  controllers: [PaymentController, PaymentApiController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
