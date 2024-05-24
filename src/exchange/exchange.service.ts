import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Exchange, Prisma } from '@prisma/client';

@Injectable()
export class ExchangeService {
  constructor(private prisma: PrismaService) {}

  async findById(
    exchangeWhereUniqueInput: Prisma.ExchangeWhereUniqueInput,
  ): Promise<Exchange | null> {
    return this.prisma.exchange.findUnique({
      where: exchangeWhereUniqueInput,
    });
  }

  async findAll(): Promise<Exchange[]> {
    return this.prisma.exchange.findMany();
  }

  async findManyFiltered(params: {
    cursor?: Prisma.ExchangeWhereUniqueInput;
    where?: Prisma.ExchangeWhereInput;
    orderBy?: Prisma.ExchangeOrderByWithRelationInput;
  }): Promise<Exchange[]> {
    const { cursor, where, orderBy } = params;
    return this.prisma.exchange.findMany({
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.ExchangeCreateInput): Promise<Exchange> {
    return this.prisma.exchange.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.ExchangeWhereUniqueInput;
    data: Prisma.ExchangeUpdateInput;
  }): Promise<Exchange> {
    const { data, where } = params;
    return this.prisma.exchange.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.ExchangeWhereUniqueInput): Promise<Exchange> {
    return this.prisma.exchange.delete({
      where,
    });
  }
}
