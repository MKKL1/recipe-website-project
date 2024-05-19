export class CommentAuthor {
    _id: string;
    username: string;

    public constructor(init?: Partial<CommentAuthor>) {
        Object.assign(this, init);
    }
}

export class Comment {
    _id: string;
    author: CommentAuthor;
    // recipe_id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    edited: boolean;

    public constructor(init?: Partial<Comment>) {
        Object.assign(this, init);
    }

}