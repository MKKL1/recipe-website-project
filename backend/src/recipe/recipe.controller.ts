import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './schemas/recipe.schema';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  async findAll(): Promise<Recipe[]> {
    return this.recipeService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async createRecipe(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }
}
