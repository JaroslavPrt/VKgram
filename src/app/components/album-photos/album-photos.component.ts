import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { VkService } from '../../services/vk.service';
import { Album } from '../../models/album.model';
import { Photo } from '../../models/photos.model';

import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../redux/IAppState';
import * as Actions from '../../redux/app.actions';

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

    isLoading = false;
    isAll = false;

    private _photoOffset = 0;
    private _photoCount = 40;

    constructor(
        private vkService: VkService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private ngRedux: NgRedux<IAppState>
    ) { }

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
        let action = Actions.setPhotoDetails(this.album.title, photo);
        this.ngRedux.dispatch(action);
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
