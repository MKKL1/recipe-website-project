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
    required: true,
  })
  // @IsNotEmpty()
  // @IsString()
  // @MinLength(6)
  // @MaxLength(255)
  readonly title: string;

  @ApiProperty({
    example: '{}',
    description: 'Content of recipe in json',
    format: 'json',
    required: true
  })
  // for testing
  // @IsNotEmpty()
  // @IsOptional()
  // @IsString()
  readonly content: string;

  //TODO check if it links to correct category
  readonly category_id: string;
}
