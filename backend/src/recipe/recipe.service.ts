import { Model, PaginateModel } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './schemas/recipe.schema';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { User } from '../users/schemas/users.schema';
import { PaginationOptionsDto } from '../pagination/pagination-options.dto';
import { paginateTool } from '../pagination/pagination.util';

@Injectable()
export class RecipeService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
              @InjectModel(Recipe.name) private recipeModelPag: PaginateModel<Recipe>) {}

  async findAll(paginationOptionsDto: PaginationOptionsDto): Promise<any> {
    return paginateTool(this.recipeModelPag, paginationOptionsDto);
  }

  async getOneRecipe(id: string): Promise<Recipe> {
    return this.recipeModel.findById(id).exec();
  }

  async create(user: User, recipeDto: CreateRecipeDto, image: Express.Multer.File): Promise<Recipe> {
    console.log(user);
    console.log(recipeDto);
    console.log(image);

    // TODO add saving image

    const recipe = new this.recipeModel({
      author_id: user._id,
      title: recipeDto.title,
      content: recipeDto.content
    });

    return recipe.save();
  }

  async updateRecipe(id: string, createRecipeDto: CreateRecipeDto) {
    return this.recipeModel.updateOne({ _id: id }, createRecipeDto).exec();
  }

  async deleteRecipe(id: string) {
    return this.recipeModel.findByIdAndDelete(id);
  }
}
