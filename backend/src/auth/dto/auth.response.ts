import {UserDto} from "../../users/dto/user.dto";

export class AuthResponse {
    readonly access_token: string;
    readonly user: UserDto;

    constructor(access_token: string, user: UserDto) {
        this.access_token = access_token;
        this.user = user;
    }
}