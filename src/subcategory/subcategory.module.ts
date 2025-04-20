import { Module } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import { SubcategoryResolver } from './subcategory.resolver';

@Module({
  controllers: [SubcategoryController],
  providers: [SubcategoryService, SubcategoryResolver],
})
export class SubcategoryModule {}
