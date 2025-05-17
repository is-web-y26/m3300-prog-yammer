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
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@ApiTags('Payment')
@Controller('api/payment')
@UseInterceptors(new CacheControl())
export class PaymentApiController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый платеж' })
  @ApiBody({
    description: 'Данные для создания платежа',
    type: CreatePaymentDto,
  })
  @ApiResponse({ status: 201, description: 'Платеж успешно создан' })
  @ApiResponse({ status: 400, description: 'Некорректны данные' })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    console.log(createPaymentDto);
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех платежей' })
  @ApiResponse({
    status: 200,
    description: 'Список платежей',
    type: [Payment],
  })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить платеж по ID' })
  @ApiResponse({
    status: 200,
    description: 'Найденный купон',
    type: Payment,
  })
  @ApiResponse({ status: 404, description: 'Платеж не найден' })
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить данные платежа' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID платежа',
  })
  @ApiBody({
    description: 'Данные для обновления платежа',
    type: UpdatePaymentDto,
  })
  @ApiResponse({ status: 200, description: 'Платеж обновлен' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  update(@Param('id') id: number, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить платеж' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID платежа',
  })
  @ApiResponse({ status: 200, description: 'Платеж удален' })
  @ApiResponse({ status: 404, description: 'Платеж не найден' })
  async remove(@Param('id') id: string) {
    await this.paymentService.remove(+id);
    return { status: 'OK' };
  }
}
