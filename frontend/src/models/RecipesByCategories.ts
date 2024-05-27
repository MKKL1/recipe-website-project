import UserOverviewDTO from "./UserOverviewDTO.ts";
import {string} from "yup";
import {RecipeOverview} from "./RecipeOverview.ts";

interface RecipeC {
    _id: string;
    title: string;
    author: UserOverviewDTO;
    image_id: string;
    createdAt: string;
    updatedAt: string;
}

// replaced RecipeC with RecipeOverview
// because first cannot be displayed in RecipeElement
export class RecipesByCategories {
    category_name: string;
    category_id: string;
    recipes: RecipeOverview[];


    constructor(category_name: string, category_id: string, recipes: RecipeOverview[]) {
        this.category_name = category_name;
        this.category_id = category_id;
        this.recipes = recipes;
    }
}