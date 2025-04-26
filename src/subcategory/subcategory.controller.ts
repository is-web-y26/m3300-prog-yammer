import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Sse, Redirect, UseFilters } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent, interval, map, Observable } from 'rxjs';
import { ApiExcludeController } from '@nestjs/swagger';
import { NotFoundExceptionFilter } from '../filters/not_found_exc.filter';

@ApiExcludeController()
@Controller('subcategory')
export class SubcategoryController {
  constructor(
    private readonly subcategoryService: SubcategoryService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, 'subcategory.update').pipe(
      map((data) => {
        return {
          data: JSON.stringify(data),
          type: 'message',
        } as MessageEvent;
      }),
    );
  }

  @Get('create')
  @Render('resources/subcategory-form')
  createForm() {
    return { layout: false };
  }

  @Get(':id/update')
  @Render('resources/subcategory-form')
  async updateForm(@Param('id') id: string) {
    return { subcategory: await this.subcategoryService.findOne(+id), layout: false };
  }

  @Post()
  @Redirect('/subcategory')
  async create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    console.log(createSubcategoryDto);
    const subcategory = await this.subcategoryService.create(createSubcategoryDto);
    return { subcategory: subcategory, layout: false };
  }

  @Get()
  @Render('resources/subcategory-list')
  async findAll() {
    return { subcategories: await this.subcategoryService.findAll(), layout: false };
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.subcategoryService.findOne(+id);
  // }

  @Post(':id/update')
  @Render('resources/subcategory-form')
  async update(@Param('id') id: string, @Body() updateSubcategoryDto: UpdateSubcategoryDto) {
    const subcategory = await this.subcategoryService.update(+id, updateSubcategoryDto);
    return { subcategory, layout: false };
  }

  @Post(':id/remove')
  @Redirect('/subcategory')
  async remove(@Param('id') id: string) {
    const subcategory = await this.subcategoryService.remove(+id);
    return { categories: await this.subcategoryService.findAll(), layout: false };
  }
}
