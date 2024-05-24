import { Prisma } from '@prisma/client';
import { IsNumberString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  readonly title: string;
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  readonly author: string;
  @ApiProperty({
    type: String,
  })
  readonly description: string;
  @IsNumberString()
  @ApiProperty({
    type: Number,
    description: 'Id of user - book owner',
  })
  userId: number;
  user?: Prisma.UserCreateNestedOneWithoutBooksInput;
  @IsNumberString()
  @ApiProperty({
    type: Number,
    description: 'Year when the book was published',
  })
  year: number;
}
