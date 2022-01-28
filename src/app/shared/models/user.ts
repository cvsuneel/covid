export class User {
    username: string;
    password: string;

    getUserName(): string {
        return this.username;
    }

    setUserName(username: string): void {
        this.username = username;
    }

    getPassword(): string {
        return this.password;
    }

    setPassword(password: string): void {
        this.username = password;
    }
}


