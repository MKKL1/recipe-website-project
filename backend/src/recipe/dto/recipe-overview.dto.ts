import { Expose, Transform, Type } from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";
import { CategoryDto } from '../../category/dto/category.dto';

export class RecipeOverviewDto{
    @Expose()
    @Transform((value) => value.obj._id.toString())
    @ApiProperty({
        description: 'Id of recipe',
        examples: ['507f191e810c19729de860ea'],
    })
    id: string;

    // get author data instead of id?
    // isn't returned
    @Expose()
    @Transform((value) => {
        value.obj.author_id.toString()
    })
    @ApiProperty({
        description: 'Id of author',
        examples: ['507f191e810c19729de860ea'],
    })
    author_id: string;

    @Expose()
    title: string;

    @Expose({name: 'category_id'})
    @Type(() => CategoryDto)
    category: CategoryDto;

    @Expose()
    createdAt: Date;

    // same as with author??
    @Expose()
    @Transform((value) => value.obj.image_id.toString())
    image_id: string;

    // add created date?
}