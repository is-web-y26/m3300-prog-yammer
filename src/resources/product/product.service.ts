import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Subcategory } from '../subcategory/entities/subcategory.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private eventEmitter: EventEmitter2,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const subcategory = await this.subcategoryRepository.findOneBy({
      id: createProductDto.subcategoryId,
    });
    if (!subcategory) {
      throw new NotFoundException(
        `Subcategory ${createProductDto.subcategoryId} not found`,
      );
    }

    const product = this.productRepository.create({
      ...createProductDto,
      subcategory: subcategory,
    });
    this.eventEmitter.emit('shop.product', { type: 'CREATE', product });
    return this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository.find({ relations: ['subcategory'] });
  }

  async findOne(id: number) {
    const key = `product-${id}`;
    const cached = await this.cacheManager.get<Product>(key);
    if (cached) {
      return cached;
    }

    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['subcategory'],
    });
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    await this.cacheManager.set(key, product);
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const subcategory = await this.subcategoryRepository.findOneBy({
      id: updateProductDto.subcategoryId,
    });
    if (!subcategory) {
      throw new NotFoundException(
        `Subcategory ${updateProductDto.subcategoryId} not found`,
      );
    }

    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
      subcategory: subcategory,
    });
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    this.eventEmitter.emit('shop.product', { type: 'UPDATE', product });
    return this.productRepository.save(product);
  }

  async remove(id: number) {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Product not found');
    this.eventEmitter.emit('shop.product', {
      type: 'REMOVE',
      product: result.raw as Product,
    });
  }
}
