import { Injectable } from '@angular/core';
import { Photo } from '../models/photos.model';

@Injectable()
export class PhotoStorageService {

    setData(albumTitle: string, photo: Photo) {
        sessionStorage.setItem('title', albumTitle);
        sessionStorage.setItem(photo.id.toString(), JSON.stringify(photo));
    }

    getData(photoId): Promise<any> {
        return new Promise((resolve, reject) => {
            let title = sessionStorage.getItem('title');
            let storagePhoto = JSON.parse(sessionStorage.getItem(photoId));

            let photo: Photo = new Photo();
            Object.assign(photo, storagePhoto);

            if (!title || !photo) {
                reject({
                    code: undefined,
                    message: 'these are not the data you are looking for'
                });
            }
            resolve({
                title: title,
                photo: photo
            });
        });
    }
}
