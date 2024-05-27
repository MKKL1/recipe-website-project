import {string} from "yup";
import {Category} from "./Category.ts";

export class RecipeOverview {
    id: string = '';
    title: string = '';
    author_id: string = '';
    category: Category = new Category();
    createdAt: Date = Date.prototype;
    image_id: string = '';

    public constructor(init?:Partial<RecipeOverview>) {
        Object.assign(this, init);
    }
}