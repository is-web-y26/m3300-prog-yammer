import { Module } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import { SubcategoryResolver } from './subcategory.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { Category } from '../category/entities/category.entity';
import { SubcategoryApiController } from './subcategory-api.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    TypeOrmModule.forFeature([Subcategory]),
    SubcategoryModule,
  ],
  controllers: [SubcategoryController, SubcategoryApiController],
  providers: [SubcategoryService, SubcategoryResolver],
  exports: [SubcategoryService],
})
export class SubcategoryModule {}
