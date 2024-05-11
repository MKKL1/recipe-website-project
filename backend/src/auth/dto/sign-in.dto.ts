import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    example: 'Bialy2115',
    description: 'Username of user',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly username: string;
  @ApiProperty({
    example: 'password',
    description: 'Password of user',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
