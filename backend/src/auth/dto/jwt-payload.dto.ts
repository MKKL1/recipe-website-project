import { Expose } from 'class-transformer';

export class JwtPayloadDto {
  @Expose()
  access_token: string;

  public constructor(init?: Partial<JwtPayloadDto>) {
    Object.assign(this, init);
  }
}
