import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put, UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
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
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { RecipeDto } from './dto/recipe.dto';
import { User } from '../users/schemas/users.schema';
import {FileInterceptor} from "@nestjs/platform-express";

@ApiTags('Recipe')
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  @UseInterceptors(new SerializeInterceptor<RecipeDto>(RecipeDto))
  @ApiOperation({ summary: 'Get all recipes' })
  @ApiOkResponse({
    description: 'Recipe record',
    type: RecipeDto,
    isArray: true,
  })
  async findAll() {
    return this.recipeService.findAll();
  }

  @Get(':id')
  @UseInterceptors(new SerializeInterceptor<RecipeDto>(RecipeDto))
  @ApiOperation({ summary: 'Get recipe by specified id' })
  @ApiOkResponse({
    description: 'Recipe',
    type: RecipeDto,
  })
  async getOneRecipe(@Param('id') id: string) {
    return this.recipeService.getOneRecipe(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Create recipe (admin)' })
  @ApiBearerAuth('access-token')
  @ApiOkResponse({})
  async createRecipe(
    @GetUser() user: User,
    @UploadedFile() image: Express.Multer.File,
    @Body() body,
  ) {
    // I don't know how to receive it in better way
    const createRecipeDto = JSON.parse(body.recipe);
    await this.recipeService.create(user, createRecipeDto, image);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update recipe (admin)' })
  @ApiBearerAuth('access-token')
  @ApiOkResponse({})
  async updateRecipe(
    @Param('id') id: string,
    @Body() createRecipeDto: CreateRecipeDto,
  ) {
    await this.recipeService.updateRecipe(id, createRecipeDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete recipe (admin)' })
  @ApiBearerAuth('access-token')
  @ApiOkResponse({})
  async deleteRecipe(@Param('id') id: string) {
    await this.recipeService.deleteRecipe(id);
  }
}
