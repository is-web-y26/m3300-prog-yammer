import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Render,
  Sse,
  Redirect,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent, map, Observable } from 'rxjs';
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
    return fromEvent(this.eventEmitter, 'shop.category').pipe(
      map((data) => {
        return {
          data: JSON.stringify(data),
          type: 'message',
        } as MessageEvent;
      }),
    );
  }

  @Get('create')
  @Render('resources/category-form')
  createForm() {
    return { title: 'Создание категории', layout: this.layout };
  }

  @Get(':id/update')
  @Render('resources/category-form')
  async updateForm(@Param('id') id: string) {
    return {
      category: await this.categoryService.findOne(+id),
      layout: this.layout,
    };
  }

  @Post()
  @Redirect('/category', HttpStatus.SEE_OTHER)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryService.create(createCategoryDto);
    return {
      url: `/category?message=Категория ${category.id}) ${category.name} создана`,
    };
  }

  @Get()
  @Render('resources/category-list')
  async findAll(@Query('message') message: string) {
    return {
      title: 'Категории',
      categories: await this.categoryService.findAll(),
      message,
      layout: this.layout,
    };
  }

  @Post(':id/update')
  @Redirect('/category', HttpStatus.SEE_OTHER)
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.categoryService.update(+id, updateCategoryDto);
    return {
      url: `/category?message=Категория ${category.id}) ${category.name} обновлена`,
    };
  }

  @Post(':id/remove')
  @Redirect('/category', HttpStatus.SEE_OTHER)
  async remove(@Param('id') id: string) {
    await this.categoryService.remove(+id);
    return { url: `/category?message=Категория удалена` };
  }

  private readonly layout = 'resource.hbs';
}
