import {string} from "yup";

export class RecipeOverview {
    id: string;
    title: string;
    author_id: string;
    category: string;
    createdAt: Date;
    image_id: string;

    constructor(id: string, title: string, author_id: string, category: string, createdAt: Date, image_id: string) {
        this.id = id;
        this.title = title;
        this.author_id = author_id;
        this.category = category;
        this.createdAt = createdAt;
        this.image_id = image_id;
    }
}