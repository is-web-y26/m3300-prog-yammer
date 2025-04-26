import { Body, Controller, Delete, Get, Param, Patch, Post, UseFilters } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';
import { NotFoundExceptionFilter } from '../filters/not_found_exc.filter';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Category')
@Controller('api/category')
export class CategoryApiController {
  constructor(
    private readonly categoryService: CategoryService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Создать новую категорию' })
  @ApiBody({ description: 'Данные для создания категории', type: CreateCategoryDto })
  @ApiResponse({ status: 201, description: 'Категория успешно создана' })
  @ApiResponse({ status: 400, description: 'Некорректны данные' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех категории' })
  @ApiResponse({ status: 200, description: 'Список категорий', type: [Category] })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить категорию по ID' })
  @ApiResponse({status: 200, description: 'Найденная категория', type: Category})
  @ApiResponse({ status: 404, description: 'Категория не найдена' })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить категорию' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'ID категории' })
  @ApiBody({
    description: 'Данные для обновления категории',
    type: UpdateCategoryDto,
    examples: {
      example1: {
        summary: 'Пример для обновления категории',
        value: { name: 'Анархия', serverName: 'anarchy' }
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Категория обновлена' })
  @ApiResponse({ status: 400, description: 'Некорректны данные' })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить категорию' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'ID категории' })
  @ApiResponse({ status: 200, description: 'Категория удалена' })
  @ApiResponse({ status: 404, description: 'Категория не найдена' })
  async remove(@Param('id') id: string) {
    await this.categoryService.remove(+id);
    return { status: 'OK' };
  }
}
