import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { CacheControl } from '../interceptors/etag.interceptor';

@ApiTags('Product')
@Controller('api/product')
@UseInterceptors(new CacheControl())
export class ProductApiController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый товар' })
  @ApiBody({
    description: 'Данные для создания товара',
    type: CreateProductDto,
  })
  @ApiResponse({ status: 201, description: 'Товар успешно создан' })
  @ApiResponse({ status: 400, description: 'Некорректны данные' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех товаров' })
  @ApiResponse({
    status: 200,
    description: 'Список товаров',
    type: [Product],
  })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить товар по ID' })
  @ApiResponse({
    status: 200,
    description: 'Найденный товар',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Товар не найден' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить товар' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID товара',
  })
  @ApiBody({
    description: 'Данные для обновления товара',
    type: UpdateProductDto,
  })
  @ApiResponse({ status: 200, description: 'Товар обновлен' })
  @ApiResponse({ status: 400, description: 'Некорректны данные' })
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить товар' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID товара',
  })
  @ApiResponse({ status: 200, description: 'Товар удален' })
  @ApiResponse({ status: 404, description: 'Товар не найдена' })
  async remove(@Param('id') id: string) {
    await this.productService.remove(+id);
    return { status: 'OK' };
  }
}
