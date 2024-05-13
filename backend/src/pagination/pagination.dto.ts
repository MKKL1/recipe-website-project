import { Expose } from 'class-transformer';

export class PaginationDto {
  @Expose()
  readonly totalDocs: number;
  @Expose()
  readonly limit: number;
  @Expose()
  readonly hasPrevPage: boolean;
  @Expose()
  readonly hasNextPage: boolean;
  @Expose()
  readonly page?: number | undefined;
  @Expose()
  readonly totalPages: number;
  @Expose()
  readonly offset: number;
  @Expose()
  readonly prevPage?: number | null | undefined;
  @Expose()
  readonly nextPage?: number | null | undefined;
  @Expose()
  readonly pagingCounter: number;
}