export class Photo {

    id: number;
    images: Array<any>;
    likes: number;
    comments: number;
    reposts: number;
    caption: string;
    private _created: string;

    constructor()
    constructor(id, images, likes, comments, reposts, text, created)
    constructor(id?, images?, likes?, comments?, reposts?, text?, created?) {
        this.id = id;
        this.images = images;
        this.likes = likes;
        this.comments = comments;
        this.reposts = reposts;
        this.caption = text;
        this._created = created;
    }

    cteated() {
        return new Date(this._created).toLocaleDateString('en-US');
    }
}
