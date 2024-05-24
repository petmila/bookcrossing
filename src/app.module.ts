import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { ExchangeModule } from './exchange/exchange.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BookModule,
    UserModule,
    ExchangeModule,
    CategoryModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/auth/login', method: RequestMethod.GET },
        { path: '/auth/login', method: RequestMethod.POST },
        { path: '/auth/registration', method: RequestMethod.GET },
        { path: '/auth/registration', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
