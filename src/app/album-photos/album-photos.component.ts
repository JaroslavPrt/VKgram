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

    constructor(
        private vkService: VkService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private photoStorage: PhotoStorageService
    ) { }

    ngOnInit() {
        this.activatedRoute.params.first().toPromise()
            .then((params: Params) => {
                let albumId = params['id'];
                return this.vkService.getAlbumById(albumId);
            })
            .then(albums => {
                this.album = albums[0];
                return this.vkService.getAlbumPhotos(this.album.id);
            })
            .then(photos => {
                let count = Math.ceil(photos.length / 4);
                this.rowsCount = Array.apply(null, {length: count}).map(Number.call, Number);
                this.photos = photos as Photo[];
            })
            .catch(error => console.log(error.message));
    }

    openPhoto(photo) {
        this.photoStorage.setData(this.album.title, photo);
        this.router.navigate(['/photo', photo.id]);
    }
}
