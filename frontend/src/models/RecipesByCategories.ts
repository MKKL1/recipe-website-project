import UserOverviewDTO from "./UserOverviewDTO.ts";
import {string} from "yup";

interface RecipeC {
    _id: string;
    title: string;
    author: UserOverviewDTO;
    image_id: string;
    createdAt: string;
    updatedAt: string;
}

export class RecipesByCategories {
    category_name: string;
    category_id: string;
    recipes: RecipeC[];


    constructor(category_name: string, category_id: string, recipes: RecipeC[]) {
        this.category_name = category_name;
        this.category_id = category_id;
        this.recipes = recipes;
    }
}