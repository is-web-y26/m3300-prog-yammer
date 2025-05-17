import { Injectable } from '@nestjs/common';
import { CategoryService } from './resources/category/category.service';
import { SubcategoryService } from './resources/subcategory/subcategory.service';
import { ProductService } from './resources/product/product.service';

@Injectable()
export class AppService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly subcategoryService: SubcategoryService,
    private readonly productService: ProductService,
  ) {}

  async shopData() {
    return {
      categories: await this.categoryService.findAll(),
      subcategories: await this.subcategoryService.findAll(),
      products: await this.productService.findAll(),
      title: 'Магазин',
      activeRoute: '/',
    };
  }

  rulesData() {
    return {
      title: 'Правила',
      activeRoute: '/rules',
    };
  }

  howToBuyData() {
    return {
      title: 'Как купить?',
      activeRoute: '/how-to-buy',
    };
  }

  privacyData() {
    return {
      title: 'Политика обработки персональных данных',
      activeRoute: '/privacy',
    };
  }

  publicOfferData() {
    return {
      title: 'Публичная оферта',
      activeRoute: '/public-offer',
    };
  }
}
