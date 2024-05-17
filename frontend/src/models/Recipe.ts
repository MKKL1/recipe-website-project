import {string} from "yup";

export class Recipe{
    _id: string;
    author_id: string;
    title: string;
    content: any;
    image_id: string;
    updatedAt: Date;


    constructor(id: string, author_id: string, title: string, content: any, image_id: string, updatedAt: Date) {
        this._id = id;
        this.author_id = author_id;
        this.title = title;
        this.content = content;
        this.image_id = image_id;
        this.updatedAt = updatedAt;
    }
}