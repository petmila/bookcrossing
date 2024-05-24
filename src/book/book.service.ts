import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BookCard, Prisma } from '@prisma/client';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async findById(
    bookCardWhereUniqueInput: Prisma.BookCardWhereUniqueInput,
  ): Promise<BookCard | null> {
    return this.prisma.bookCard.findUnique({
      where: bookCardWhereUniqueInput,
    });
  }

  async findAll(): Promise<BookCard[]> {
    return this.prisma.bookCard.findMany();
  }

  async findManyFiltered(params: {
    cursor?: Prisma.BookCardWhereUniqueInput;
    where?: Prisma.BookCardWhereInput;
    orderBy?: Prisma.BookCardOrderByWithRelationInput;
  }): Promise<BookCard[]> {
    const { cursor, where, orderBy } = params;
    return this.prisma.bookCard.findMany({
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.BookCardCreateInput): Promise<BookCard> {
    return this.prisma.bookCard.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.BookCardWhereUniqueInput;
    data: Prisma.BookCardUpdateInput;
  }): Promise<BookCard> {
    const { data, where } = params;
    return this.prisma.bookCard.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.BookCardWhereUniqueInput): Promise<BookCard> {
    return this.prisma.bookCard.delete({
      where,
    });
  }
}
