import { Body, Controller, Delete, Get, Param, Patch, Post, UseFilters } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { SubcategoryService } from './subcategory.service';
import { Subcategory } from './entities/subcategory.entity';
import { NotFoundExceptionFilter } from 'src/filters/not_found_exc.filter';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@ApiTags('Subcategory')
@Controller('api/subcategory')
export class SubcategoryApiController {
  constructor(
    private readonly subcategoryService: SubcategoryService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Создать новую подкатегорию' })
  @ApiBody({ description: 'Данные для создания подкатегории', type: CreateSubcategoryDto })
  @ApiResponse({ status: 201, description: 'Подкатегория успешно создана' })
  @ApiResponse({ status: 400, description: 'Некорректны данные' })
  create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    console.log(createSubcategoryDto.checkMethod);
    return this.subcategoryService.create(createSubcategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех подкатегории' })
  @ApiResponse({ status: 200, description: 'Список категорий', type: [Subcategory] })
  findAll() {
    return this.subcategoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить категорию по ID' })
  @ApiResponse({status: 200, description: 'Найденная подкатегория', type: Subcategory})
  @ApiResponse({ status: 404, description: 'Подкатегория не найдена' })
  findOne(@Param('id') id: string) {
    return this.subcategoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить категорию' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'ID подкатегории' })
  @ApiBody({
    description: 'Данные для обновления подкатегории',
    type: UpdateSubcategoryDto,
    examples: {
      example1: {
        summary: 'Пример для обновления подкатегории',
        value: {
          name: 'Привилегии',
          giveCommand: 'lp user %nickname% parent add %product% server=%server%',
          categoryId: 1,
        }
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Подкатегория обновлена' })
  @ApiResponse({ status: 400, description: 'Некорректны данные' })
  update(@Param('id') id: string, @Body() updateSubcategoryDto: UpdateSubcategoryDto) {
    return this.subcategoryService.update(+id, updateSubcategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить подкатегорию' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'ID подкатегории' })
  @ApiResponse({ status: 200, description: 'Подкатегория удалена' })
  @ApiResponse({ status: 404, description: 'Подкатегория не найдена' })
  async remove(@Param('id') id: string) {
    await this.subcategoryService.remove(+id);
    return { status: 'OK' };
  }
}
