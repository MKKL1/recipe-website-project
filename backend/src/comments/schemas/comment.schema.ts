import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/schemas/users.schema';
import { Recipe } from '../../recipe/schemas/recipe.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' })
  recipe_id: Recipe;

  @Prop()
  content: string;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);