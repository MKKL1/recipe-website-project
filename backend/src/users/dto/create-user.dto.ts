import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { isUnique } from '../../validators/unique.interface';

export class CreateUserDto {
  @ApiProperty({
    example: 'Bialy2115',
    description: 'Username of user',
    format: 'string',
    minLength: 5,
    maxLength: 16,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(16)
  @isUnique({ collection: 'users', column: 'username' })
  readonly username: string;

  @ApiProperty({
    example: 'example@example.com',
    description: 'Email of user',
    format: 'string',
    minLength: 5,
    maxLength: 16,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @isUnique({ collection: 'users', column: 'email' })
  readonly email: string;

  @ApiProperty({
    example: 'password',
    description: 'Password of user',
    format: 'string',
    minLength: 5,
    maxLength: 16,
  })
  @MinLength(5)
  @MaxLength(16)
  readonly password: string;
}
