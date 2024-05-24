import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  Render,
  Query,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

import { BookCard as BookCardModel } from '@prisma/client';

import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiTags,
  ApiExcludeEndpoint,
  ApiParam,
} from '@nestjs/swagger';
import { TimeInterceptor } from '../time.interceptor';
// import { AuthInterceptor } from '../auth.interceptor';
import { AuthorizedAs } from '../auth/authorizedUser';

@ApiBearerAuth()
@ApiTags('books')
@Controller('/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Return all books' })
  @Get('all')
  async findAll(): Promise<BookCardModel[]> {
    return await this.bookService.findAll();
  }

  @ApiExcludeEndpoint()
  @Get()
  @UseInterceptors(new TimeInterceptor())
  @Render('index')
  async findAllPage(@AuthorizedAs() currentUserId: number) {
    return {
      currentUserId: +currentUserId,
      books: await this.bookService.findAll(),
    };
  }

  @ApiOperation({ summary: 'Get books by the title or author' })
  @ApiResponse({
    status: 200,
    description: 'Return all books with that title or that author',
  })
  @ApiParam({ name: 'searchString', type: 'string' })
  @Get('/search/:searchString')
  async findByTitleOrAuthor(
    @Param('searchString') searchString: string,
  ): Promise<BookCardModel[]> {
    return await this.bookService.findManyFiltered({
      where: {
        OR: [
          {
            author: searchString,
          },
          {
            title: searchString,
          },
        ],
      },
    });
  }

  @ApiExcludeEndpoint()
  @Get('/search')
  @UseInterceptors(new TimeInterceptor())
  @Render('index')
  async findByTitleOrAuthorPage(@Query('searchString') searchString: string) {
    return {
      books: await this.bookService.findManyFiltered({
        where: {
          OR: [
            {
              author: searchString,
            },
            {
              title: searchString,
            },
          ],
        },
      }),
    };
  }

  @ApiOperation({ summary: 'Get books by category' })
  @ApiResponse({
    status: 200,
    description: 'Return all books with that category',
  })
  @ApiParam({ name: 'categoryName', type: 'string' })
  @Get('/category/:categoryName')
  async findByCategory(
    @Param('categoryName') categoryName: string,
  ): Promise<BookCardModel[]> {
    return await this.bookService.findManyFiltered({
      where: {
        categoryName: categoryName,
      },
    });
  }

  @ApiExcludeEndpoint()
  @Get('/category')
  @UseInterceptors(new TimeInterceptor())
  @Render('index')
  async findByCategoryPage(@Query('categoryName') categoryName: string) {
    return {
      books: await this.bookService.findManyFiltered({
        where: {
          categoryName: categoryName,
        },
      }),
    };
  }

  @ApiOperation({ summary: 'Get book by id' })
  @ApiResponse({
    status: 200,
    description: 'Return book',
  })
  @Get(':bookId')
  @ApiParam({ name: 'bookId', type: 'number' })
  async findById(@Param('bookId') bookId: number): Promise<BookCardModel> {
    return await this.bookService.findById({ id: Number(bookId) });
  }

  @ApiExcludeEndpoint()
  @Get('/bookPage/:bookId')
  @UseInterceptors(new TimeInterceptor())
  @Render('book')
  async findByIdPage(@Param('id') bookId: number): Promise<BookCardModel> {
    return await this.bookService.findById({ id: Number(bookId) });
  }

  @ApiOperation({ summary: 'Get all books this user registered' })
  @ApiResponse({
    status: 200,
    description: 'Return all books this user registered',
  })
  @ApiParam({ name: 'userId', type: 'number' })
  @Get('/:userId/my-books')
  async findBooksByUser(
    @Param('userId') userId: number,
  ): Promise<BookCardModel[]> {
    return await this.bookService.findManyFiltered({
      where: { userId: +userId },
    });
  }

  @ApiExcludeEndpoint()
  @Get('/completeExchange/:userId/:exchangeId')
  @Render('exchange')
  @UseInterceptors(new TimeInterceptor())
  async findBooksByUserPage(
    @Param('userId') userId: number,
    @Param('exchangeId') exchangeId: number,
  ) {
    return {
      exchangeId: Number(exchangeId),
      my_books: await this.bookService.findManyFiltered({
        where: { userId: +userId },
      }),
    };
  }

  @ApiOperation({ summary: 'Register book' })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully registered.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(
    @Body() bookData: CreateBookDto,
    @Req() request,
    @Res() response,
  ) {
    const path: string = request.get('referer');
    await this.bookService.create({
      title: bookData.title,
      author: bookData.author,
      description: bookData.description,
      year: +bookData.year,
      user: { connect: { id: +bookData.userId } },
    });
    return response.redirect(path);
  }

  @ApiOperation({ summary: 'Update book' })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':id')
  async update(
    @Param('id') bookId: number,
    @Body() bookData: UpdateBookDto,
  ): Promise<BookCardModel> {
    bookData.user = { connect: { id: bookData.userId } };
    bookData.userId = +bookData.userId;
    bookData.year = +bookData.year;
    return this.bookService.update({ where: { id: bookId }, data: bookData });
  }

  @ApiOperation({ summary: 'Delete book' })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully deleted.',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':id')
  async delete(@Param('id') bookId: number): Promise<BookCardModel> {
    return this.bookService.delete({ id: +bookId });
  }
}
