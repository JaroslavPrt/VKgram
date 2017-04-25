import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Album } from '../models/album.model';
import { VkService } from '../services/vk.service';
import { Photo } from '../models/photos.model';

import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-album-photos',
    templateUrl: './album-photos.component.html',
    styleUrls: ['./album-photos.component.scss'],
    providers: [ VkService ]
})
export class AlbumPhotosComponent implements OnInit {

    album: Album;
    photos: Photo[] = [];
    rowsCount = [];

    constructor(
        private vkService: VkService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.params.first().toPromise()
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
}
