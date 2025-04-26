import { Injectable, NotFoundException, UseFilters } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundExceptionFilter } from '../filters/not_found_exc.filter';
import { Subcategory } from '../subcategory/entities/subcategory.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createProductDto: CreateProductDto) {
    console.log(createProductDto);
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
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['subcategory'],
    });
    if (!product)
      throw new NotFoundException(`Product ${id} not found`);
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
    if (!product)
      throw new NotFoundException(`Product ${id} not found`);
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
