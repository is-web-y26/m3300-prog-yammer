import { Get, Controller, Render, Post, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Response } from 'express';
import { AppService } from './app.service';

@ApiExcludeController()
@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get()
  @Render('pages/shop')
  getShop() {
    return this.service.shopData();
  }

  @Post()
  async getPostShop(@Res() res: Response) {
    return await this.getPostAns(
      res,
      'pages/shop',
      await this.service.shopData(),
    );
  }

  @Get('rules')
  @Render('pages/rules')
  getRules() {
    return this.service.rulesData();
  }

  @Post('rules')
  async getPostRules(@Res() res: Response) {
    return await this.getPostAns(res, 'pages/rules', this.service.rulesData());
  }

  @Get('how-to-buy')
  @Render('pages/how-to-buy')
  getHowToBuy() {
    return this.service.howToBuyData();
  }

  @Post('how-to-buy')
  async getPostHowToBuy(@Res() res: Response) {
    return await this.getPostAns(
      res,
      'pages/how-to-buy',
      this.service.howToBuyData(),
    );
  }

  @Get('privacy')
  @Render('pages/privacy')
  getPrivacy() {
    return this.service.privacyData();
  }

  @Post('privacy')
  async getPostPrivacy(@Res() res: Response) {
    return await this.getPostAns(
      res,
      'pages/privacy',
      this.service.privacyData(),
    );
  }

  @Get('public-offer')
  @Render('pages/public-offer')
  getPublicOffer() {
    return this.service.publicOfferData();
  }

  @Post('public-offer')
  async getPostPublicOffer(@Res() res: Response) {
    return await this.getPostAns(
      res,
      'pages/public-offer',
      this.service.publicOfferData(),
    );
  }

  private async getPostAns(res: Response, view: string, data: any) {
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
