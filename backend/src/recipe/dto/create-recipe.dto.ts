import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
  @ApiProperty({
    example: 'Bread recipe example title',
    description: 'Title of recipe',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  // @IsNotEmpty()
  // @IsString()
  // @MinLength(6)
  // @MaxLength(255)
  readonly title: string;

  @ApiProperty({
    example: '',
    description: 'Content of recipe in json?',
    format: 'string',
  })
  // for testing
  // @IsNotEmpty()
  // @IsOptional()
  // @IsString()
  readonly content: string;
}
