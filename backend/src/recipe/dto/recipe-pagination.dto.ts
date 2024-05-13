import { Exclude, Expose, Type } from 'class-transformer';
import { PaginationDto } from '../../pagination/pagination.dto';
import { RecipeDto } from './recipe.dto';

export class RecipePaginationDto {
  @Expose()
  @Type(() => RecipeDto)
  readonly docs: RecipeDto[];

  @Expose()
  @Type(() => PaginationDto)
  readonly paginator: PaginationDto;
}