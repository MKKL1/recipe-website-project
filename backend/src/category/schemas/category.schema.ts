import {HydratedDocument, Schema as S, Types} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
    _id: Types.ObjectId;

    @Prop({ required: true })
    name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);