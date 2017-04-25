export class Photo {

    id: number;
    smallUrl: string;
    likes: number;
    comments: number;
    reposts: number;
    caption: string;
    private _created: Date;

    constructor(id, small, likes, comments, reposts, text, created) {
        this.id = id;
        this.smallUrl = small;
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
