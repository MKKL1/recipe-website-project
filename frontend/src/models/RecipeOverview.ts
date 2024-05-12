export class RecipeOverview {
    id: string;
    name: string;
    content: string;

    constructor(id: string, name: string, content: string) {
        this.id = id;
        this.name = name;
        this.content = content;
    }
}