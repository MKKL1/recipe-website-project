import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example: 'My comment on this recipe...',
    description: 'Content of recipe in json?',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly content: string;
}
