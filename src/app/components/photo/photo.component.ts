import { Component, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { Photo } from '../../models/photos.model';
import { IAppState } from '../../redux/IAppState';

import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnDestroy {

    title: string;
    photo: Photo;
    imageWidth = '';

    private detailsSubscription;

    constructor(private ngRedux: NgRedux<IAppState>) {
        this.detailsSubscription = this.ngRedux.select<IAppState>()
            .subscribe(details => {
                this.title = details.title;
                this.photo = details.photo;
            });
    }

    ngOnDestroy(): void {
        this.detailsSubscription.unsubscribe();
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
