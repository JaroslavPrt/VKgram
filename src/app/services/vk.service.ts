import { Injectable } from '@angular/core';

import { User } from '../models/user.model';
import { Album } from '../models/album.model';

declare const VK: any;

@Injectable()
export class VkService {

    private app_id = 5994214;

    constructor() {
        VK.init({apiId: this.app_id});
    }

    public signIn(): Promise<any> {
        return new Promise((resolve, reject) => {
            VK.Auth.login((response) => {
                response.session ? resolve(true) : reject(this.handleError(response));
            },  VK.access.PHOTOS);
        });
    }

    public signOut(): Promise<any>  {
        return new Promise((resolve, reject) => {
            VK.Auth.logout((response) => {
                response.status === 'unknown' ? resolve(true) : reject(this.handleError(response));
            });
        });
    }

    public loginStatus(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            VK.Auth.getLoginStatus( function (response) {
                response.session ? resolve(true) : reject(false);
            });
        });
    }

    public userInfo(): Promise<any> {
        return new Promise((resolve, reject) => {
            VK.Api.call('users.get', {fields: 'photo_50, nickname'}, (r) => {
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

    public getAlbums(): Promise<any> {
        return new Promise((resolve, reject) => {
            VK.Api.call('photos.getAlbums', {need_covers: 1, need_system: 1}, (r) => {
                r.response ? resolve(this.convertApiAlbums(r.response)) : reject(this.handleError(r));
            });
        });
    }

    private convertApiAlbums(apiAlbums) {
        let albums = [];
        for (let al of apiAlbums) {
            albums.push(new Album(
                al.aid,
                al.title,
                al.size ,
                al.thumb_src,
                (+al.updated * 1000) || 0
            ));
        }
        return albums;
    }

    private handleError(error) {
        return {
            message: error.message || 'oops something went wrong'
        };
    }
}
