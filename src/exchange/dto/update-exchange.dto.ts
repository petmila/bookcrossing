import { Prisma } from '@prisma/client';
import { IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateExchangeDto {
  // @IsNumberString()
  // @ApiProperty({
  //   type: Number,
  //   description: 'Id of the book user (who started exchange) wants to get',
  // })
  // readonly bookForCreatorId: number;
  @IsNumberString()
  @ApiProperty({
    type: Number,
    description:
      'Id of the book user (who started exchange) offers in exchange',
  })
  readonly bookForOwnerId: number;
  // @IsNumberString()
  // @ApiProperty({
  //   type: Number,
  //   description: 'Id of the user who started exchange',
  // })
  // readonly creatorId: number;
  @IsNumberString()
  @ApiProperty({
    type: Number,
    description: 'Id of the user who gets an exchange offer',
  })
  readonly ownerId: number;
  bookForCreator?: Prisma.BookCardCreateNestedOneWithoutExchangesAsFirstBookInput;
  creator?: Prisma.UserCreateNestedOneWithoutExchangesAsCreatorInput;
  bookForOwner?: Prisma.BookCardCreateNestedOneWithoutExchangesAsSecondBookInput;
  owner?: Prisma.UserCreateNestedOneWithoutExchangesAsOwnerInput;
}
