import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { TimeInterceptor } from './time.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalInterceptors(new TimeInterceptor());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.use(cookieParser());

  const hbs = require('hbs');
  hbs.registerPartials(
    join(__dirname, '..', 'views', 'partials'),
    function () {},
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  const config = new DocumentBuilder()
    .setTitle('Bookcrossing')
    .setDescription('Bookcrossing API description')
    .setVersion('1.0')
    .addTag('books')
    .addTag('profiles')
    .addTag('exchanges')
    .addTag('categories')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
