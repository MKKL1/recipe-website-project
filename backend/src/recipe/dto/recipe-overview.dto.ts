import {Expose, Transform} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class RecipeOverviewDto{
    @Expose()
    @Transform((value) => value.obj._id.toString())
    @ApiProperty({
        description: 'Id of recipe',
        examples: ['507f191e810c19729de860ea'],
    })
    id: string;

    // get author data instead of id?
    @Expose()
    @Transform((value) => value.obj.author_id.toString())
    @ApiProperty({
        description: 'Id of author',
        examples: ['507f191e810c19729de860ea'],
    })
    author_id: string;

    @Expose()
    title: string;

    // same as with author??
    // why it is same as recipe id?
    @Expose()
    @Transform((value) => value.obj._id.toString())
    image_id: string;

    // add created date?
}