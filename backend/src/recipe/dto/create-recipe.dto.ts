import { IsNotEmpty, MinLength, MaxLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
  @ApiProperty({
    example: 'Bread recipe example tilte',
    description: 'Title of recipe',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  readonly title: string;

  @ApiProperty({
    example: '',
    description: 'Content of recipe in json?',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly content: string;
}
