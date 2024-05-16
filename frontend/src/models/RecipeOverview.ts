import {string} from "yup";

export class RecipeOverview {
    id: string;
    title: string;
    description?: string;
    author_id: string;
    image_id: string;


    constructor(id: string, title: string, description: string, author_id: string, image_id: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.author_id = author_id;
        this.image_id = image_id;
    }
}