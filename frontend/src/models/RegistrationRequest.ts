export class RegistrationRequest{
    public username: string;
    public email: string;
    public password: string;
    public passwordConfirm: string;

    constructor(username: string, email: string, password: string, passwordConfirm: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.passwordConfirm = passwordConfirm;
    }
}