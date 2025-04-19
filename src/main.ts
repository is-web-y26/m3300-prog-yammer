import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as exphbs from 'express-handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: join(__dirname, '..', 'views', 'layouts'),
    partialsDir: join(__dirname, '..', 'views', 'partials'),
    // helpers: {
    //   // Регистрация хелперов
    //   currentYear: () => new Date().getFullYear(),
    //   // Другие хелперы...
    // }
  });

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.engine('hbs', hbs.engine);
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
