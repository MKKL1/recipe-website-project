import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './schemas/recipe.schema';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { User } from '../users/schemas/users.schema';

@Injectable()
export class RecipeService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}

  async findAll(): Promise<Recipe[]> {
    return this.recipeModel.find().exec();
  }

  async getOneRecipe(id: string): Promise<Recipe> {
    return this.recipeModel.findById(id).exec();
  }

  async create(createRecipeDto: CreateRecipeDto, user: User): Promise<Recipe> {
    const createdCat = new this.recipeModel({
      ...createRecipeDto,
      author_id: user,
      created_at: Date.now(),
      updated_at: Date.now(),
    });
    return createdCat.save();
  }

  async updateRecipe(id: string, createRecipeDto: CreateRecipeDto) {
    return this.recipeModel
      .updateOne(
        { _id: id },
        {
          ...createRecipeDto,
          updated_at: Date.now(),
        },
      )
      .exec();
  }

  async deleteRecipe(id: string) {
    return this.recipeModel.findByIdAndDelete(id);
  }
}
