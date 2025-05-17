import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethod } from '../entities/payment.entity';

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: 'ID игрока покупателя' })
  @Type(() => Number)
  @IsNumber()
  playerId: number;

  @ApiProperty({ example: 50, description: 'ID купона' })
  @Type(() => Number)
  @ValidateIf(o => o.couponId !== null)
  // @IsOptional()
  @IsNumber()
  couponId: number | null;

  @ApiProperty({ example: 1, description: 'ID покупаемого товара' })
  @Type(() => Number)
  @IsNumber()
  productId: number;

  @ApiProperty({ example: 'mir', description: 'Способ оплаты' })
  @IsEnum(PaymentMethod)
  method: PaymentMethod;
}
