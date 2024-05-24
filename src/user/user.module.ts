import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { BookService } from '../book/book.service';
import { ExchangeService } from '../exchange/exchange.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, BookService, ExchangeService],
  exports: [UserService],
})
export class UserModule {}
