export class User {

    private firstName: string;
    private lastName: string;
    private avatar: string;

    constructor (first, last, avatarUrl) {
        this.firstName = first;
        this.lastName = last;
        this.avatar = avatarUrl;
    }

    avatarUrl() {
        return this.avatar;
    }

    fullName() {
        return this.firstName + ' ' + this.lastName;
    }
}
