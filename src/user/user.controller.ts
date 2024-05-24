import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ExchangeStatus, User as UserModel } from '@prisma/client';

import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiTags,
  ApiParam,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { BookService } from '../book/book.service';
import { TimeInterceptor } from '../time.interceptor';
import { ExchangeService } from '../exchange/exchange.service';
import { AuthorizedAs } from '../auth/authorizedUser';

@ApiBearerAuth()
@ApiTags('profiles')
@Controller('profiles')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private bookService: BookService,
    private exchangeService: ExchangeService,
  ) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get()
  async findAll(): Promise<UserModel[]> {
    return await this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'Return user',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @Get(':id')
  async findById(@Param('id') userId: number): Promise<UserModel> {
    return await this.userService.findById({ id: Number(userId) });
  }

  @ApiExcludeEndpoint()
  @Get('/profilePage/:userId')
  @Render('profile')
  @UseInterceptors(new TimeInterceptor())
  async getUserBooksForProfilePage(@AuthorizedAs() currentUserId: number) {
    const userId = currentUserId;
    return {
      my_book: await this.bookService.findManyFiltered({
        where: { userId: +userId },
      }),
      exchanges_from: await this.exchangeService.findManyFiltered({
        where: {
          creatorId: +userId,
        },
      }),
      exchanges_to: await this.exchangeService.findManyFiltered({
        where: {
          ownerId: +userId,
        },
      }),
      complete_exchanges: await this.exchangeService.findManyFiltered({
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
      }),
    };
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@Body() userData: CreateUserDto): Promise<UserModel> {
    return this.userService.create(userData);
  }

  @ApiOperation({ summary: 'Update user information' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'id', type: 'number' })
  @Put(':id')
  async update(
    @Param('id') userId: number,
    @Body('user') userData: UpdateUserDto,
  ): Promise<UserModel> {
    return this.userService.update({ where: { id: userId }, data: userData });
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'id', type: 'number' })
  @Delete(':id')
  async delete(@Param('id') userId: number): Promise<UserModel> {
    return this.userService.delete({ id: userId });
  }
}
