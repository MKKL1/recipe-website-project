import {string} from "yup";

export class Comment{
    _id: string;
    user_id: string;
    recipe_id: string;
    content: string;

    constructor(id: string, user_id: string, recipe_id: string, content: string) {
        this._id = id;
        this.user_id = user_id;
        this.recipe_id = recipe_id;
        this.content = content;
    }
}