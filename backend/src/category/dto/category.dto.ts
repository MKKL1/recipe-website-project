import {Expose, Transform} from "class-transformer";

export class CategoryDto {
    @Expose()
    @Transform((value) => value.obj._id.toString())
    _id: string;

    @Expose()
    name: string;
}