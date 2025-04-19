import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('pages/shop')
  root() {
    return { title: 'Shop' };
  }
}
