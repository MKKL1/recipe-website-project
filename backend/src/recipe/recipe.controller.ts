import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './schemas/recipe.schema';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all recipes' })
  @ApiOkResponse({})
  async findAll(): Promise<Recipe[]> {
    return this.recipeService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get recipe by specified id' })
  async getOneRecipe(@Param() params): Promise<Recipe> {
    return this.recipeService.getOneRecipe(params.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create recipe' })
  async createRecipe(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update recipe' })
  @ApiOkResponse({})
  async updateRecipe(
    @Param() params,
    @Body() createRecipeDto: CreateRecipeDto,
  ) {
    return this.recipeService.updateRecipe(params.id, createRecipeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete recipe' })
  @ApiOkResponse({})
  async deleteRecipe(@Param() params) {
    return this.recipeService.deleteRecipe(params.id);
  }
}
