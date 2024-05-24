import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  readonly name: string;
  @ApiProperty({
    type: String,
  })
  readonly includedGenres: string;
  @ApiProperty({
    type: String,
  })
  readonly description: string;
}
