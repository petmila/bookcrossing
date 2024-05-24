import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  readonly nickname: string;
  @IsEmail()
  @ApiProperty({
    type: String,
  })
  readonly email: string;
  @ApiProperty({
    type: String,
    description: 'Any description of that user likes in books (genre, authors)',
  })
  readonly bookPreference?: string;
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  readonly password: string;
}
