import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsEmail()
  @ApiProperty({
    type: String,
  })
  readonly email: string;
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  readonly password: string;
}
