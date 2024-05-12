import { Expose, Transform } from 'class-transformer';

export class UserDto {
  @Expose()
  @Transform((value) => value.obj._id.toString())
  _id: string;
  @Expose()
  username: string;
  @Expose()
  email: string;
  @Expose()
  roles: string[];
}
