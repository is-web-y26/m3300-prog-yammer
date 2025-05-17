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
import { CacheControl } from '../../interceptors/etag.interceptor';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';

@ApiTags('Coupon')
@Controller('api/coupon')
@UseInterceptors(new CacheControl())
export class CouponApiController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый купон' })
  @ApiBody({
    description: 'Данные для создания купона',
    type: CreateCouponDto,
  })
  @ApiResponse({ status: 201, description: 'Купон успешно создан' })
  @ApiResponse({ status: 400, description: 'Некорректны данные' })
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.create(createCouponDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех купонов' })
  @ApiResponse({
    status: 200,
    description: 'Список категорий',
    type: [Coupon],
  })
  findAll() {
    return this.couponService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить купон по ID' })
  @ApiResponse({
    status: 200,
    description: 'Найденный купон',
    type: Coupon,
  })
  @ApiResponse({ status: 404, description: 'Купон не найден' })
  findOne(@Param('id') id: string) {
    return this.couponService.findOne(+id);
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Получить купон по коду' })
  @ApiResponse({
    status: 200,
    description: 'Найденный купон',
    type: Coupon,
  })
  @ApiResponse({ status: 404, description: 'Купон не найден' })
  findOneByCode(@Param('code') code: string) {
    return this.couponService.findOneByCode(code);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить купон' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID купон',
  })
  @ApiBody({
    description: 'Данные для обновления купона',
    type: UpdateCouponDto,
  })
  @ApiResponse({ status: 200, description: 'Купон обновлен' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  update(@Param('id') id: number, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponService.update(+id, updateCouponDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить купон' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID категории',
  })
  @ApiResponse({ status: 200, description: 'Купон удален' })
  @ApiResponse({ status: 404, description: 'Купон не найден' })
  async remove(@Param('id') id: string) {
    await this.couponService.remove(+id);
    return { status: 'OK' };
  }
}
