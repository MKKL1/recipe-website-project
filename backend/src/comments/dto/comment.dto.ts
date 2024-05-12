import { Expose, Transform } from 'class-transformer';

export class CommentDto {
  @Expose()
  @Transform((value) => value.obj._id.toString())
  _id: string;
  @Expose()
  @Transform((value) => value.obj.user_id.toString())
  user_id: string;
  @Expose()
  @Transform((value) => value.obj.recipe_id.toString())
  recipe_id: string;
  @Expose()
  content: string;
}
