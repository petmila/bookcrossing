import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category as CategoryModel } from '@prisma/client';

import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Return all categories' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get()
  async findAll(): Promise<CategoryModel[]> {
    return await this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'Get category by name' })
  @ApiResponse({
    status: 200,
    description: 'Return category',
  })
  @ApiParam({ name: 'name', type: 'string' })
  @Get(':name')
  async findById(@Param('name') categoryName: string): Promise<CategoryModel> {
    return await this.categoryService.findByName({ name: categoryName });
  }

  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@Body() data: CreateCategoryDto): Promise<CategoryModel> {
    return this.categoryService.create(data);
  }

  @ApiOperation({ summary: 'Update category information' })
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':name')
  async update(
    @Param('name') categoryName: string,
    @Body() data: CreateCategoryDto,
  ): Promise<CategoryModel> {
    return this.categoryService.update({
      where: { name: categoryName },
      data: data,
    });
  }

  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully deleted.',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':id')
  async delete(@Param('id') categoryId: number): Promise<CategoryModel> {
    return this.categoryService.delete({ id: categoryId });
  }
}
