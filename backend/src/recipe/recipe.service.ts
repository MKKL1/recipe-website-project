import { Model, PaginateModel, SortOrder } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './schemas/recipe.schema';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { User } from '../users/schemas/users.schema';
import { PaginationOptionsDto } from '../pagination/pagination-options.dto';
import { paginateTool } from '../pagination/pagination.util';
import { ImageService } from '../image/image.service';
import { CommentsService } from '../comments/comments.service';

@Injectable()
export class RecipeService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
              @InjectModel(Recipe.name) private recipeModelPag: PaginateModel<Recipe>,
              private readonly imageService: ImageService,
              private readonly commentsService: CommentsService) {}

  async findAll(paginationOptionsDto: PaginationOptionsDto): Promise<any> {
    return paginateTool(this.recipeModelPag, paginationOptionsDto);
  }

  async getOneRecipe(id: string): Promise<Recipe> {
    return this.recipeModel.findById(id).exec();
  }

  async getOneRecipeWithComments(id: string, limit: number, sort?: string | {[p: string]: SortOrder | {$meta: any}} | [string, SortOrder][]): Promise<any> {
    const obj = await this.recipeModel.findById(id).lean().exec();
    obj['comments'] = await this.commentsService.getLimited(id, limit, sort)
    return obj;
  }

  async create(user: User, recipeDto: CreateRecipeDto, image: Express.Multer.File): Promise<Recipe> {
    const saved = await this.imageService.saveFile(image);
    const recipe = await new this.recipeModel({
      author_id: user._id,
      ...recipeDto,
      image_id: saved._id
    }).save();

    return recipe;
  }

  async updateRecipe(id: string, createRecipeDto: CreateRecipeDto) {
    return this.recipeModel.updateOne({ _id: id }, createRecipeDto).exec();
  }

  async deleteRecipe(id: string) {
    // is image deleted?
    return this.recipeModel.findByIdAndDelete(id);
  }
}
