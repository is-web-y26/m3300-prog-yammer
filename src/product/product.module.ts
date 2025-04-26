import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subcategory } from '../subcategory/entities/subcategory.entity';
import { Product } from './entities/product.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { ProductApiController } from './product-api.controller';
import { ProductResolver } from './product.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subcategory]),
    TypeOrmModule.forFeature([Product]),
    ProductModule,
    CacheModule.register(),
  ],
  controllers: [ProductController, ProductApiController],
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductModule {}
