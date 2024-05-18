import { Expose, Transform, Type } from 'class-transformer';
import { UserOverviewDto } from '../../users/dto/user-overview.dto';



export class CommentDto {
  @Expose()
  @Transform((value) => value.obj._id.toString())
  _id: string;

  @Expose()
  @Type(() => UserOverviewDto)
  user_id: UserOverviewDto;

  @Expose()
  content: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  edited: boolean;
}
