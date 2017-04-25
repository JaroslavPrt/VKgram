import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

import { Album } from '../models/album.model';
import { VkService } from '../services/vk.service';

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

    constructor(
        private location: Location,
        private vkService: VkService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.params.first().toPromise()
            .then((params: Params) => {
                let albumId = params['id'];
                return this.vkService.getAlbumById(albumId);
            })
            .then(albums => this.album = albums[0])
            .catch(error => console.log(error.message));
    }

    goBack() {
        this.location.back();
    }
}
