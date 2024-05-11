import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './schemas/recipe.schema';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}

  async findAll(): Promise<Recipe[]> {
    return this.recipeModel.find().exec();
  }

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const createdCat = new this.recipeModel(createRecipeDto);
    return createdCat.save();
  }
}
