import { HydratedDocument, Schema as S, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type ImageDocument = HydratedDocument<Image>;

@Schema({ timestamps: true })
export class Image {
  _id: Types.ObjectId;

  // @Prop({ unique: true, required: true })
  // fileHash: string;

  @Prop({ unique: true, required: true })
  location: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);