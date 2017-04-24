import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

import { Album } from '../models/album.model';
import { VkService } from '../services/vk.service';

@Component({
    selector: 'app-album-photos',
    templateUrl: './album-photos.component.html',
    styleUrls: ['./album-photos.component.scss'],
    providers: [ VkService ]
})
export class AlbumPhotosComponent implements OnInit {

    album: Album;

    private _albumId;

    constructor(
        private location: Location,
        private vkService: VkService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.activatedRoute.params
            .subscribe((params: Params) => {
                this._albumId = params['id'];
                console.log('id', this._albumId);
            });
    }

    goBack() {
        this.location.back();
    }
}
