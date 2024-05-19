import {Comment} from "./Comment.ts";
import {UserOverviewDto} from "./UserOverviewDTO.ts";

export class Recipe{
    _id: string;
    author: UserOverviewDto;
    title: string;
    content: any;
    category: string;
    createdAt: Date;
    updatedAt: Date;
    image_id: string;
    comments: Comment[];

    constructor(id: string, author: UserOverviewDto, title: string, content: any, category: string, createdAt: Date, updatedAt: Date, image_id: string, comments: Comment[]) {
        this._id = id;
        this.author = author;
        this.title = title;
        this.content = content;
        this.category = category;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.image_id = image_id;
        this.comments = comments;
    }
}