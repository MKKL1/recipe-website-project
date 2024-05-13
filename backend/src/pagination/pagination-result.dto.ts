import { Exclude, Expose, Type } from 'class-transformer';
import { PaginationDto } from './pagination.dto';
import { ValidateNested } from 'class-validator';

export class PaginationResultDto<T> {
  @Exclude()
  private type: Function;

  @Expose()
  @Type(options => {
    return (options.newObject as PaginationResultDto<T>).type;
  })
  readonly docs: T[];

  @Expose()
  @Type(() => PaginationDto)
  readonly paginator: PaginationDto;

  constructor(type: Function) {
    this.type = type;
  }
}