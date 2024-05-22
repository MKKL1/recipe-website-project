import {isUnique} from "../../validators/unique.interface";

export class CreateCategoryDto {
    // @isUnique({ collection: 'categories', column: 'name' })
    name: string;
}