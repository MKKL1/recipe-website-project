import { Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CommentDto } from '../../comments/dto/comment.dto';
import {UserOverviewDto} from "../../users/dto/user-overview.dto";

export class RecipeDto {
  @Expose()
  @Transform((value) => value.obj._id.toString())
  @ApiProperty({
    description: 'Id of recipe',
    examples: ['507f191e810c19729de860ea'],
  })
  _id: string;

  @Expose({name: 'author_id'})
  @Type(() => UserOverviewDto)
  // @Transform((value) => value.obj.author_id.toString())
  // @ApiProperty({
  //   description: 'Id of author',
  //   examples: ['507f191e810c19729de860ea'],
  // })
  author: UserOverviewDto;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  category: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Transform((value) => value.obj.image_id.toString())
  image_id: string;

  @Expose()
  @Type(() => CommentDto)
  comments: any[];
}
