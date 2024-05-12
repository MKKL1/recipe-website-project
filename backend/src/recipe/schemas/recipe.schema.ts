import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas/users.schema';

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema()
export class Recipe {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author_id: User;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  image_id: string;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
