import { Exclude, Expose, Type } from 'class-transformer';
import { PaginationDto } from '../../pagination/pagination.dto';
import { RecipeDto } from './recipe.dto';
import {RecipeOverviewDto} from "./recipe-overview.dto";

export class RecipePaginationDto {
  // @Expose()
  // @Type(() => RecipeDto)
  // readonly docs: RecipeDto[];
  // there is no need to return full object with heavy content
  @Expose()
  @Type(() => RecipeOverviewDto)
  readonly docs: RecipeOverviewDto[];

  @Expose()
  @Type(() => PaginationDto)
  readonly paginator: PaginationDto;
}