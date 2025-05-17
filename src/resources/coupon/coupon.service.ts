import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from '../coupon/entities/coupon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>,
  ) {}

  create(createCouponDto: CreateCouponDto) {
    const now = new Date();
    const end = new Date(now);
    end.setMonth(now.getMonth() + 1);

    const coupon = this.couponRepository.create({
      ...createCouponDto,
      validFrom: now,
      validTo: end,
    });
    return this.couponRepository.save(coupon);
  }

  async findAll() {
    return await this.couponRepository.find({ relations: ['subcategories'] });
  }

  async findOne(id: number) {
    const coupon = await this.couponRepository.findOne({
      where: { id },
    });
    if (!coupon) throw new NotFoundException(`Coupon ${id} not found`);
    return coupon;
  }

  async findOneByCode(code: string) {
    const coupon = await this.couponRepository.findOneBy({
      code: code,
    });
    if (!coupon)
      throw new NotFoundException(`Coupon with code ${code} not found`);
    return coupon;
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    const coupon = await this.couponRepository.preload({
      id,
      ...updateCouponDto,
    });
    if (!coupon) throw new NotFoundException(`Coupon ${id} not found`);
    return this.couponRepository.save(coupon);
  }

  async remove(id: number) {
    const result = await this.couponRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Coupon not found');
  }
}
