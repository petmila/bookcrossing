import { Prisma } from '@prisma/client';
import { IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExchangeDto {
  @IsNumberString()
  @ApiProperty({
    type: Number,
    description: 'Id of the book user (who started exchange) wants to get',
  })
  readonly bookForCreatorId: number;
  @ApiProperty({
    type: Number,
    description: 'Id of user who starts exchange',
  })
  readonly creatorId: number;
  bookForCreator: Prisma.BookCardCreateNestedOneWithoutExchangesAsFirstBookInput;
  creator: Prisma.UserCreateNestedOneWithoutExchangesAsCreatorInput;
}
