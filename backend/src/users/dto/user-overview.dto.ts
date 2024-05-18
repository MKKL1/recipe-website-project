import { Expose, Transform } from 'class-transformer';

export class UserOverviewDto {
  @Expose()
  @Transform((value) => value.obj._id.toString())
  _id: string;
  @Expose()
  username: string;
}