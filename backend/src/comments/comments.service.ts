import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { User } from '../users/schemas/users.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async getAll(recipeId: string): Promise<Comment[]> {
    return this.commentModel.find({ recipe_id: recipeId }).exec();
  }

  async getOne(id: string): Promise<Comment> {
    return this.commentModel.findById(id).exec();
  }

  async create(
    createCommentDto: CreateCommentDto,
    user: User,
    recipeId: string,
  ): Promise<Comment> {
    const createdCat = new this.commentModel({
      ...createCommentDto,
      user_id: user._id,
      recipe_id: recipeId,
    });
    return createdCat.save();
  }

  async update(id: string, createCommentDto: CreateCommentDto, user: User) {
    if (!this.checkPermission(id, user)) {
      throw new UnauthorizedException();
    }
    return this.commentModel.updateOne({ _id: id }, createCommentDto).exec();
  }

  async delete(id: string, user: User) {
    if (!this.checkPermission(id, user)) {
      throw new UnauthorizedException();
    }
    return this.commentModel.findByIdAndDelete(id);
  }

  async checkPermission(id: string, user: User) {
    if (user.roles.includes('admin')) return true;

    const comment = await this.commentModel.findById(id).exec();
    if (!comment) {
      throw new NotFoundException();
    }
    return comment.user_id._id === user._id;
  }
}
