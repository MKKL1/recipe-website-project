export class User{
    id: string;
    username: string;
    email: string;
    roles: string[];

    constructor(id: string, username: string, email: string, roles: string[]) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }
}