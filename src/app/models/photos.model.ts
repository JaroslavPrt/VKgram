export class Photo {

    smallUrl: string;
    bigUrl: string;
    likes: number;
    comments: number;
    reposts: number;
    caption: string;
    private _created: Date;

    constructor(small, big, likes, comments, reposts, text, created) {
        this.smallUrl = small;
        this.bigUrl = big;
        this.likes = likes;
        this.comments = comments;
        this.reposts = reposts;
        this.caption = text;
        this._created = new Date(created);
    }

    cteated() {
        return this._created.toLocaleDateString('en-US');
    }
}
