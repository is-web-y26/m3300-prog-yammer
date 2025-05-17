import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Product } from '../product/entities/product.entity';
import { Coupon } from '../coupon/entities/coupon.entity';
import { Player } from '../player/entities/player.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    let amount: number = 0;
    const product = await this.productRepository.findOneBy({
      id: createPaymentDto.productId,
    });
    if (!product) {
      throw new NotFoundException(
        `Product ${createPaymentDto.productId} not found`,
      );
    }
    amount = product.price;

    let coupon: Coupon | null = null;
    if (createPaymentDto.couponId) {
      coupon = await this.couponRepository.findOneBy({
        id: createPaymentDto.couponId,
      });
      if (!coupon) {
        throw new NotFoundException(
          `Coupon ${createPaymentDto.couponId} not found`,
        );
      }
      amount = Math.ceil((amount * coupon.discount) / 100);
    }

    const player = await this.playerRepository.findOneBy({
      id: createPaymentDto.playerId,
    });
    if (!player) {
      throw new NotFoundException(
        `Player ${createPaymentDto.playerId} not found`,
      );
    }

    const payment = this.paymentRepository.create({
      product: product,
      coupon: coupon,
      player: player,
      amount: amount,
      method: createPaymentDto.method,
      url: `https://example.com/payment?player=${player.nickname}&product=${product.name}&amount=${amount}`,
    });

    return this.paymentRepository.save(payment);
  }

  async findAll() {
    return await this.paymentRepository.find({ relations: ['subcategories'] });
  }

  async findOne(id: number) {
    const payment = await this.paymentRepository.findOne({
      where: { id },
    });
    if (!payment) throw new NotFoundException(`Payment ${id} not found`);
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentRepository.preload({
      id,
      ...updatePaymentDto,
    });
    if (!payment) throw new NotFoundException(`Payment ${id} not found`);
    return this.paymentRepository.save(payment);
  }

  async remove(id: number) {
    const result = await this.paymentRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Payment not found');
  }
}
