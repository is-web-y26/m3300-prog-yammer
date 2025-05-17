import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { CouponApiController } from './coupon-api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon]), CouponModule],
  controllers: [CouponController, CouponApiController],
  providers: [CouponService],
  exports: [CouponService],
})
export class CouponModule {}
