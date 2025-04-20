import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as methodOverride from 'method-override';
import * as exphbs from 'express-handlebars';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  app.use(
    methodOverride('_method', {
      methods: ['POST', 'GET'], // Разрешаем переопределение для POST и GET
    }),
  );
  app.use(methodOverride('_method'));
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
