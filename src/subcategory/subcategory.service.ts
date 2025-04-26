import { Injectable, NotFoundException, UseFilters } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Subcategory } from './entities/subcategory.entity';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { Category } from '../category/entities/category.entity';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { NotFoundExceptionFilter } from '../filters/not_found_exc.filter';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createSubcategoryDto: CreateSubcategoryDto) {
    const category = await this.categoryRepository.findOneBy({
      id: createSubcategoryDto.categoryId,
    });
    if (!category) {
      throw new NotFoundException(
        `Category ${createSubcategoryDto.categoryId} not found`,
      );
    }

    const subcategory = this.subcategoryRepository.create({
      ...createSubcategoryDto,
      category: category,
    });
    this.eventEmitter.emit('shop.subcategory', { type: 'CREATE', subcategory });
    return this.subcategoryRepository.save(subcategory);
  }

  async findAll() {
    return await this.subcategoryRepository.find({ relations: ['category'] });
  }

  async findOne(id: number) {
    const subcategory = await this.subcategoryRepository.findOneBy({ id });
    if (!subcategory)
      throw new NotFoundException(`Subcategory ${id} not found`);
    return subcategory;
  }

  async update(id: number, updateSubcategoryDto: UpdateSubcategoryDto) {
    const category = await this.categoryRepository.findOneBy({
      id: updateSubcategoryDto.categoryId,
    });
    if (!category) {
      throw new NotFoundException(
        `Category ${updateSubcategoryDto.categoryId} not found`,
      );
    }

    const subcategory = await this.subcategoryRepository.preload({
      id,
      ...updateSubcategoryDto,
      iconUrl: '',
      category: category,
    });
    if (!subcategory)
      throw new NotFoundException(`Subcategory ${id} not found`);
    this.eventEmitter.emit('shop.subcategory', { type: 'UPDATE', subcategory });
    return this.subcategoryRepository.save(subcategory);
  }

  async remove(id: number) {
    const result = await this.subcategoryRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Subcategory not found');
    this.eventEmitter.emit('shop.subcategory', {
      type: 'REMOVE',
      subcategory: result.raw as Subcategory,
    });
  }
}
