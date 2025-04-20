import { Get, Controller, Render } from '@nestjs/common';
import { CategoryService } from './category/category.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @Render('pages/shop')
  async getShop() {
    return { categories: await this.categoryService.findAll() };
  }
}
