import { Expose, Transform } from 'class-transformer';

export class CommentDto {
  @Expose()
  @Transform((value) => value.obj._id.toString())
  _id: string;

  @Expose()
  @Transform((value) => value.obj.user_id.toString())
  user_id: string;

  // No need for that as we always specify which recipe we need
  // @Expose()
  // @Transform((value) => value.obj.recipe_id.toString())
  // recipe_id: string;

  @Expose()
  content: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  edited: boolean;
}
