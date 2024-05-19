export default class UserOverviewDTO{
    _id: string;
    username: string;

    constructor(id: string, username: string) {
        this._id = id;
        this.username = username;
    }
}