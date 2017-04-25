export class Album {

    id: string;
    title: string;
    size: number;
    thumbSrc: string;
    private _updated: Date;

    constructor(id, title, size, ts, updated) {
        this.id = id;
        this.title = title;
        this.size = size;
        this.thumbSrc = ts;
        this._updated = new Date(updated);
    }

    lastUpdated() {
        if (this._updated.getTime() === new Date(0).getTime()) {
            return 'undefined';
        }
        return this._updated.toLocaleDateString('en-US');
    }
}
