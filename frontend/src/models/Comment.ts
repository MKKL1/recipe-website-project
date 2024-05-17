import {boolean, string} from "yup";

export class Comment{
    _id: string;
    user_id: string;
    recipe_id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    edited: boolean;

    constructor(id: string, user_id: string, recipe_id: string, content: string, createdAt: Date, updatedAt: Date, edited: boolean) {
        this._id = id;
        this.user_id = user_id;
        this.recipe_id = recipe_id;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.edited = edited;
    }
}