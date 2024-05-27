import {Comment} from "./Comment.ts";
import UserOverviewDto from "./UserOverviewDTO.ts";
import {Category} from "./Category.ts";

export class Recipe{
    _id: string = '';
    author: UserOverviewDto = new UserOverviewDto('', '');
    title: string = '';
    content: any;
    category: Category = new Category();
    createdAt: Date = Date.prototype;
    updatedAt: Date = Date.prototype;
    image_id: string = '';
    comments: Comment[] = [];

    public constructor(init?:Partial<Recipe>) {
        Object.assign(this, init);
    }

    // constructor(id: string = '', author: UserOverviewDto, title: string, content: any, category: string, createdAt: Date, updatedAt: Date, image_id: string, comments: Comment[]) {
    //     this._id = id;
    //     this.author = author;
    //     this.title = title;
    //     this.content = content;
    //     this.category = category;
    //     this.createdAt = createdAt;
    //     this.updatedAt = updatedAt;
    //     this.image_id = image_id;
    //     this.comments = comments;
    // }
}