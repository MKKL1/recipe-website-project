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
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './schemas/recipe.schema';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../users/decorators/getuser.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Recipe')
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
  @UseGuards(RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create recipe' })
  @ApiBearerAuth()
  @ApiOkResponse({})
  async createRecipe(
    @GetUser() user,
    @Body() createRecipeDto: CreateRecipeDto,
  ) {
    return this.recipeService.create(createRecipeDto, user);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update recipe' })
  @ApiBearerAuth()
  @ApiOkResponse({})
  async updateRecipe(
    @Param() params,
    @Body() createRecipeDto: CreateRecipeDto,
  ) {
    return this.recipeService.updateRecipe(params.id, createRecipeDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete recipe' })
  @ApiBearerAuth()
  @ApiOkResponse({})
  async deleteRecipe(@Param() params) {
    return this.recipeService.deleteRecipe(params.id);
  }
}
