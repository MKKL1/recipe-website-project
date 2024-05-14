import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as S } from 'mongoose';
import { User } from '../../users/schemas/users.schema';
import * as paginate from "mongoose-paginate-v2";
import { Image } from '../../image/schemas/image.schema';

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema({ timestamps: true })
export class Recipe {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name })
  author_id: User;

  @Prop()
  title: string;

  @Prop()
  content: S.Types.Mixed;

  @Prop({ type: Types.ObjectId, ref: Image.name })
  image_id: Image;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
RecipeSchema.plugin(paginate);
