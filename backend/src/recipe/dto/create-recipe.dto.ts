import { IsNotEmpty, MinLength, MaxLength, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
  @ApiProperty({
    example: 'Bread recipe example title',
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

  @ApiProperty({
    example:
      'https://preppykitchen.com/wp-content/uploads/2022/03/Artisan-Bread-Recipe-Card-500x500.jpg',
    description: 'For now use url to image until I make image storage',
    format: 'string',
  })
  @IsOptional()
  @IsString()
  image_id: string;
}
