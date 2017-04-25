import { Injectable } from '@angular/core';

import { User } from '../models/user.model';
import { Album } from '../models/album.model';
import { Photo } from '../models/photos.model';

declare const VK: any;

@Injectable()
export class VkService {

    private app_id = 5994214;

    constructor() {
        VK.init({apiId: this.app_id});
    }

    signIn(): Promise<any> {
        return new Promise((resolve, reject) => {
            VK.Auth.login(response => {
                response.session ? resolve(true) : reject(this.handleError(response));
            },  VK.access.PHOTOS);
        });
    }

    signOut(): Promise<any>  {
        return new Promise((resolve, reject) => {
            VK.Auth.logout(response => {
                response.status === 'unknown' ? resolve(true) : reject(this.handleError(response));
            });
        });
    }

    loginStatus(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            VK.Auth.getLoginStatus(response => {
                response.session ? resolve(true) : reject(false);
            });
        });
    }

    userInfo(): Promise<any> {
        return new Promise((resolve, reject) => {
            VK.Api.call('users.get', {fields: 'photo_50, nickname'}, r => {
                if (r.response[0]) {
                    const apiUser = r.response[0];
                    const user = new User(apiUser.first_name, apiUser.last_name, apiUser.photo_50);
                    resolve(user);
                } else {
                    reject(this.handleError(r));
                }
            });
        });
    }

    getAlbums(): Promise<any> {
        let opts = {
            need_covers: 1,
            need_system: 1
        };
        return this.callGetAlbums(opts);
    }

    getAlbumById(id): Promise<any> {
        let opts = {
            album_ids: id
        };
        return this.callGetAlbums(opts);
    }

    private callGetAlbums(opts): Promise<any> {
        return new Promise((resolve, reject) => {
            VK.Api.call('photos.getAlbums', opts, r => {
                r.response ? resolve(this.convertApiAlbums(r.response)) : reject(this.handleError(r));
            });
        });
    }

    private convertApiAlbums(apiAlbums) {
        let albums = [];
        for (let al of apiAlbums) {
            albums.push(new Album(al.aid, al.title, al.size , al.thumb_src, (+al.updated * 1000) || 0));
        }
        return albums;
    }

    getAlbumPhotos(albumId): Promise<any> {
        return new Promise((resolve, reject) => {
            VK.Api.call('photos.get', {album_id: albumId, extended: 1, photo_sizes: 1}, r => {
                r.response ? resolve(this.convertApiPhotos(r.response)) : reject(this.handleError(r));
            });
        });
    }

    private convertApiPhotos(apiPhotos) {
        let photos = [];
        for (let p of apiPhotos) {
            photos.push(new Photo(p.sizes[2].src, p.sizes.pop().src, p.likes.count, p.comments.count, p.reposts.count,
                p.text, (+p.created * 1000)));
        }
        return photos;
    }

    private handleError(error) {
        return {
            message: error.message || 'oops something went wrong'
        };
    }
}
