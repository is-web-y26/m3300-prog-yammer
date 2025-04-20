import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Sse, Redirect } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent, interval, map, Observable } from 'rxjs';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, 'category.update').pipe(
      map((data) => {
        return {
          data: JSON.stringify(data),
          type: 'message',
        } as MessageEvent;
      }),
    );
  }

  // @Get('form/add')
  // @Render('resources/category-form')
  // categoryAddForm() {
  //   return { layout: false };
  // }
  //
  // @Get('form/update/:id')
  // @Render('resources/category-form')
  // async categoryUpdateForm(@Param('id') id: string) {
  //   return { category: await this.categoryService.findOne(+id), layout: false };
  // }

  @Get('create')
  @Render('resources/category-form')
  createForm() {
      return { layout: false };
  }

  @Get(':id/update')
  @Render('resources/category-form')
  async updateForm(@Param('id') id: string) {
    return { category: await this.categoryService.findOne(+id), layout: false };
  }

  @Post()
  @Redirect('/category/:id/update')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryService.create(createCategoryDto);
    return { category: category, layout: false };
  }

  @Get()
  @Render('resources/category-list')
  async findAll() {
    return { categories: await this.categoryService.findAll(), layout: false };
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoryService.findOne(+id);
  // }

  @Post(':id/update')
  @Render('resources/category-form')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryService.update(+id, updateCategoryDto);
    return { category, layout: false };
  }

  @Post(':id/remove')
  @Redirect('/category')
  async remove(@Param('id') id: string) {
    const category = await this.categoryService.remove(+id);
    return { categories: await this.categoryService.findAll(), layout: false };
  }
}
