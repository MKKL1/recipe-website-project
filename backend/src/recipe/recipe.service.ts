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
