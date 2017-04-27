import { Injectable } from '@angular/core';

import { User } from '../models/user.model';
import { Album } from '../models/album.model';
import { Photo } from '../models/photos.model';

declare const VK: any;

@Injectable()
export class VkService {

    private app_id = 5993132;

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
        let method = 'users.get';
        let params = { fields: 'photo_50, nickname' };
        return this.callApiMethod(method, params)
            .then(r => {
                if (r.response[0]) {
                    let apiUser = r.response[0];
                    let user = new User(apiUser.first_name, apiUser.last_name, apiUser.photo_50);
                    return Promise.resolve(user);
                } else {
                    return Promise.reject(this.handleError(r));
                }
            });
    }

    getAlbums(): Promise<any> {
        let params = {
            need_covers: 1,
            need_system: 1
        };
        return this.apiAlbums(params);
    }

    getAlbumById(id): Promise<any> {
        let params = {
            album_ids: id
        };
        return this.apiAlbums(params);
    }

    private apiAlbums(params): Promise<any> {
        let method = 'photos.getAlbums';
        return this.callApiMethod(method, params)
            .then(r => {
                if (r.response) {
                    let albums = this.convertApiAlbums(r.response);
                    return Promise.resolve(albums);
                } else {
                    return Promise.reject(this.handleError(r));
                }
            });
    }

    private convertApiAlbums(apiAlbums) {
        let albums = [];
        for (let al of apiAlbums) {
            albums.push(new Album(al.aid, al.title, al.size , al.thumb_src, (+al.updated * 1000) || 0));
        }
        return albums;
    }

    getAlbumPhotos(albumId, offset, count): Promise<any> {
        let method = 'photos.get';
        let params = {
            album_id: albumId,
            extended: 1,
            photo_sizes: 1,
            offset: offset,
            count: count
        };
        return this.callApiMethod(method, params)
            .then(r => {
                if (r.response) {
                    let photos = this.convertApiPhotos(r.response);
                    return Promise.resolve(photos);
                } else {
                    return Promise.reject(this.handleError(r));
                }
            });
    }

    private convertApiPhotos(apiPhotos) {
        let photos = [];
        for (let p of apiPhotos) {
            photos.push(new Photo(p.pid, p.sizes, p.likes.count, p.comments.count, p.reposts.count,
                p.text, (+p.created * 1000)));
        }
        return photos;
    }

    /* hard */
    serverUploadUrl(): Promise<any> {
        return new Promise((resolve, reject) => {
            VK.Api.call('photos.getUploadServer', { album_id: 244218175 }, (r) => {
                console.dir(r);
                r.response.upload_url ? resolve(r.response.upload_url) : reject ('error');
            });
        });
    }

    private callApiMethod(method, params): Promise<any> {
        return new Promise((resolve) => {
            VK.Api.call(method, params, result => {
                resolve(result);
            });
        });
    }

    private handleError(error) {
        return {
            code: error.error_code || undefined,
            message: error.error_msg || 'oops something went wrong'
        };
    }
}
