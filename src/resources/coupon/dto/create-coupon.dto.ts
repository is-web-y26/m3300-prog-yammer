import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCouponDto {
  @ApiProperty({ example: 'itmo', description: 'Прококод' })
  @IsString()
  code: string;

  @ApiProperty({ example: 50, description: 'Размер скидки в %' })
  @Type(() => Number)
  @IsNumber()
  discount: number;
}
