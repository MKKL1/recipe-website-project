export class CommentAuthor {
    _id: string = '';
    username: string = '';

    public constructor(init?: Partial<CommentAuthor>) {
        Object.assign(this, init);
    }
}

export class Comment {
    _id: string = '';
    author: CommentAuthor = new CommentAuthor({});
    content: string = '';
    createdAt: Date = Date.prototype;
    updatedAt: Date = Date.prototype;
    edited: boolean = false;

    public constructor(init?: Partial<Comment>) {
        Object.assign(this, init);
    }

}