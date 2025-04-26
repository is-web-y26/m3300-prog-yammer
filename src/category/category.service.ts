import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private eventEmitter: EventEmitter2,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    this.eventEmitter.emit('shop.category', { type: 'CREATE', category });
    return this.categoryRepository.save(category);
  }

  async findAll() {
    return await this.categoryRepository.find({ relations: ['subcategories'] });
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['subcategories'],
    });
    console.log(category);
    if (!category) throw new NotFoundException(`Category ${id} not found`);
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.preload({
      id,
      ...updateCategoryDto,
    });
    if (!category) throw new NotFoundException(`Category ${id} not found`);
    this.eventEmitter.emit('shop.category', { type: 'UPDATE', category });
    return this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Category not found');
    this.eventEmitter.emit('shop.category', {
      type: 'REMOVE',
    });
  }
}
