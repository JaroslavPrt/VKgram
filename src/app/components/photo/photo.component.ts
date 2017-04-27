import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';

import { Photo } from '../../models/photos.model';
import { PhotoStorageService } from '../../services/photo-storage.service';

import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.scss'],
    providers: [ PhotoStorageService ]
})
export class PhotoComponent implements OnInit {

    title: string;
    photo: Photo;
    imageWidth = '';

    constructor(
        private activatedRoute: ActivatedRoute,
        private photoStorage: PhotoStorageService
    ) {}

    ngOnInit() {
        this.activatedRoute.params.first().toPromise()
            .then((params: Params) => {
                let photoId = params['id'];
                return this.photoStorage.getData(photoId);
            })
            .then((data) => {
                this.title = data.title;
                this.photo = data.photo;
            })
            .catch((error) => console.dir(error));
    }

    getPhotoByHeight() {
        let imgHeight = screen.height * 0.6;
        let photoSrc = this.photo.images[0].src;
        this.photo.images.forEach((img, i) => {
            if (img.height < imgHeight && img.type !== 's') {
                photoSrc = img.src;
                this.imageWidth = img.width;
            }
        });
        return photoSrc;
    }
}
