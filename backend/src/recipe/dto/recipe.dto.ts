import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RecipeDto {
  @Expose()
  @Transform((value) => value.obj._id.toString())
  @ApiProperty({
    description: 'Id of recipe',
    examples: ['507f191e810c19729de860ea'],
  })
  _id: string;
  @Expose()
  @Transform((value) => value.obj.author_id.toString())
  @ApiProperty({
    description: 'Id of author',
    examples: ['507f191e810c19729de860ea'],
  })
  author_id: string;
  @Expose()
  title: string;
  @Expose()
  content: string;
  @Expose()
  image_id: string;
}
