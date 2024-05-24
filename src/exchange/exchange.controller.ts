import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  Res,
  Redirect,
} from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { Exchange as ExchangeModel } from '@prisma/client';
import { ExchangeStatus } from '@prisma/client';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { UpdateExchangeDto } from './dto/update-exchange.dto';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { AuthorizedAs } from '../auth/authorizedUser';

@ApiBearerAuth()
@ApiTags('exchanges')
@Controller('exchanges')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @ApiOperation({ summary: 'Get all exchanges' })
  @ApiResponse({ status: 200, description: 'Return all exchanges' })
  @Get()
  async findAll(): Promise<ExchangeModel[]> {
    return await this.exchangeService.findAll();
  }

  @ApiOperation({
    summary:
      'Get exchanges by the userOwner (user who gets the exchange offer)',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all exchanges someone offered the userOwner',
  })
  @ApiParam({ name: 'userOwnerId', type: 'number' })
  @Get('owner/:userOwnerId')
  async findByUserOwner(
    @Param('userOwnerId') userOwnerId: number,
  ): Promise<ExchangeModel[]> {
    return await this.exchangeService.findManyFiltered({
      where: { ownerId: userOwnerId },
    });
  }

  @ApiOperation({
    summary: 'Get exchanges by the userCreator (user offers the exchange)',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all exchanges this user offered to someone',
  })
  @ApiParam({ name: 'userCreatorId', type: 'number' })
  @Get('creator/:userCreatorId')
  async findByUserCreator(
    @Param('userCreatorId') userCreatorId: number,
  ): Promise<ExchangeModel[]> {
    return await this.exchangeService.findManyFiltered({
      where: { creatorId: userCreatorId },
    });
  }

  @ApiOperation({ summary: 'Get exchange by id' })
  @ApiResponse({
    status: 200,
    description: 'Return exchange',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @Get(':id')
  async findById(@Param('id') exchangeId: number): Promise<ExchangeModel> {
    return await this.exchangeService.findById({ id: Number(exchangeId) });
  }

  @ApiOperation({ summary: 'Get all completed exchanges for this user' })
  @ApiResponse({ status: 200, description: 'Return all books' })
  @ApiParam({ name: 'userId', type: 'number' })
  @Get('completed-exchanges/:userId')
  async findCompletedExchangesByUser(
    @Param('id') userId: number,
  ): Promise<ExchangeModel[]> {
    return await this.exchangeService.findManyFiltered({
      where: {
        OR: [
          {
            ownerId: +userId,
          },
          {
            creatorId: +userId,
          },
        ],
        AND: [
          {
            status: ExchangeStatus.COMPLETED,
          },
        ],
      },
    });
  }

  @ApiOperation({ summary: 'Create exchange' })
  @ApiResponse({
    status: 201,
    description: 'The exchange has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(
    @Body() exchangeData: CreateExchangeDto,
    @Res() response,
    @AuthorizedAs() creatorId: number,
  ) {
    exchangeData.creator = { connect: { id: +creatorId } };
    exchangeData.bookForCreator = {
      connect: { id: +exchangeData.bookForCreatorId },
    };
    const newExchange = await this.exchangeService.create({
      creator: exchangeData.creator,
      bookForCreator: exchangeData.bookForCreator,
    });
    const path = '/books/completeExchange/' + creatorId + '/' + newExchange.id;
    return response.redirect(path);
  }

  @ApiOperation({ summary: 'Update exchange' })
  @ApiResponse({
    status: 201,
    description: 'The exchange has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':id')
  @Redirect('/books')
  async update(
    @Param('id') exchangeId: number,
    @Body('exchange')
    exchangeData: UpdateExchangeDto,
  ): Promise<ExchangeModel> {
    // exchangeData.creator = { connect: { id: +exchangeData.creatorId } };
    // exchangeData.bookForCreator = {
    //   connect: { id: +exchangeData.bookForCreatorId },
    // };
    exchangeData.owner = { connect: { id: +exchangeData.ownerId } };
    exchangeData.bookForOwner = {
      connect: { id: +exchangeData.bookForOwnerId },
    };
    return this.exchangeService.update({
      where: { id: exchangeId },
      data: exchangeData,
    });
  }

  @ApiOperation({ summary: 'Delete book' })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully deleted.',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':id')
  async delete(@Param('id') exchangeId: number): Promise<ExchangeModel> {
    return this.exchangeService.delete({ id: exchangeId });
  }
}
