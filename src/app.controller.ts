import { Get, Controller, Render, Post, Res } from '@nestjs/common';
import { CategoryService } from './category/category.service';
import { ApiExcludeController } from '@nestjs/swagger';
import { SubcategoryService } from './subcategory/subcategory.service';
import { ProductService } from './product/product.service';
import { Response } from 'express';

@ApiExcludeController()
@Controller()
export class AppController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly subcategoryService: SubcategoryService,
    private readonly productService: ProductService,
  ) {}

  @Get()
  @Render('pages/shop')
  getShop() {
    return this.shopData();
  }

  @Post()
  async getPostShop(@Res() res: Response) {
    return await this.getPostAns(res, 'pages/shop', await this.shopData());
  }

  @Get('rules')
  @Render('pages/rules')
  async getRules() {
    return this.rulesData();
  }

  @Post('rules')
  async getPostRules(@Res() res: Response) {
    return await this.getPostAns(res,'pages/rules', this.rulesData());
  }

  @Get('how-to-buy')
  @Render('pages/how-to-buy')
  async getHowToBuy() {
    return this.howToBuyData();
  }

  @Post('how-to-buy')
  async getPostHowToBuy(@Res() res: Response) {
    return await this.getPostAns(res,'pages/how-to-buy', this.howToBuyData());
  }

  @Get('privacy')
  @Render('pages/privacy')
  async getPrivacy() {
    return this.privacyData();
  }

  @Post('privacy')
  async getPostPrivacy(@Res() res: Response) {
    return await this.getPostAns(res,'pages/privacy', this.privacyData());
  }

  @Get('public-offer')
  @Render('pages/public-offer')
  async getPublicOffer() {
    return this.publicOfferData();
  }

  @Post('public-offer')
  async getPostPublicOffer(@Res() res: Response) {
    return await this.getPostAns(res,'pages/public-offer', this.publicOfferData());
  }

  private async shopData() {
    return {
      categories: await this.categoryService.findAll(),
      subcategories: await this.subcategoryService.findAll(),
      products: await this.productService.findAll(),
      title: 'Магазин',
      activeRoute: '/',
    };
  }

  private rulesData() {
    return {
      title: 'Правила',
      activeRoute: '/rules',
    };
  }

  private howToBuyData() {
    return {
      title: 'Как купить?',
      activeRoute: '/how-to-buy',
    };
  }

  private privacyData() {
    return {
      title: 'Политика обработки персональных данных',
      activeRoute: '/privacy',
    };
  }

  private publicOfferData() {
    return {
      title: 'Публичная оферта',
      activeRoute: '/public-offer',
    };
  }

  private async getPostAns(
    res: Response,
    view: string,
    data: any,
  ) {
    const renderedHtml = await new Promise((resolve, reject) => {
      res.app.render(view, { ...data, layout: false }, (err, html) => {
        if (err) {
          reject(err);
        } else {
          resolve(html);
        }
      });
    });

    return res.json({
      title: data.title,
      main: renderedHtml,
    });
  }
}
