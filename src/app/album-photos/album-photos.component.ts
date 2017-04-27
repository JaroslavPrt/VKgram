import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Album } from '../models/album.model';
import { VkService } from '../services/vk.service';
import { Photo } from '../models/photos.model';
import { PhotoStorageService } from '../services/photo-storage.service';

import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-album-photos',
    templateUrl: './album-photos.component.html',
    styleUrls: ['./album-photos.component.scss'],
    providers: [ VkService, PhotoStorageService ]
})
export class AlbumPhotosComponent implements OnInit {

    album: Album;
    photos: Photo[] = [];
    rowsCount = [];

    isLoading = false;
    isAll = false;

    private _photoOffset = 0;
    private _photoCount = 40;

    constructor(
        private vkService: VkService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private photoStorage: PhotoStorageService
    ) {}

    ngOnInit() {
        this.activatedRoute.params.first().toPromise()
            .then((params: Params) => {
                let albumId = params['id'];
                return this.vkService.getAlbumById(albumId);
            })
            .then(albums => {
                this.album = albums[0];
                this.loadPhotos();
            })
            .catch(error => console.log(error.message));
    }

    openPhoto(photo) {
        this.photoStorage.setData(this.album.title, photo);
        this.router.navigate(['/photo', photo.id]);
    }

    loadMore() {
        if (this.isLoading || !this.album || this.isAll) return;
        this.isLoading = true;
        this.loadPhotos();
    }

    private loadPhotos() {
        this.vkService.getAlbumPhotos(this.album.id, this._photoOffset, this._photoCount)
            .then(photos => {
                if (photos.length > 0) {
                    this.processReceivedPhoto(photos);
                    this._photoOffset += this._photoCount;
                } else {
                    this.isAll = true;
                }
                this.isLoading = false;
            })
            .catch(error => console.log(error.message));
    }

    private processReceivedPhoto(photos) {
        this.photos = this.photos.concat(photos);
        let count = Math.ceil(this.photos.length / 4);
        this.rowsCount = Array.apply(null, {length: count}).map(Number.call, Number);
    }
}
