import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema()
export class Recipe {
  @Prop()
  title: string;

  @Prop()
  content: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
