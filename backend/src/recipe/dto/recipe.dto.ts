import { Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CommentDto } from '../../comments/dto/comment.dto';

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
  description?: string;

  @Expose()
  content: string;

  @Expose()
  @Transform((value) => value.obj.image_id.toString())
  image_id: string;

  @Expose()
  @Type(() => CommentDto)
  comments: CommentDto[];
}
