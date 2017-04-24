export class Album {

    id: string;
    title: string;
    size: number;
    thumbSrc: string;

    private updated: Date;

    constructor(id, title, size, ts, updated) {
        this.id = id;
        this.title = title;
        this.size = size;
        this.thumbSrc = ts;
        this.updated = new Date(updated);
    }

    lastUpdated() {
        if (this.updated.getTime() === new Date(0).getTime()) {
            return 'undefined';
        }
        return this.updated.toLocaleDateString('en-US');
    }
}
