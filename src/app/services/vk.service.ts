import { Injectable } from '@angular/core';

declare const VK: any;

@Injectable()
export class VkService {

    private app_id = 5994214;

    constructor() {
        VK.init({ apiId: this.app_id });
    }

    public signIn(): Promise<any> {
        return new Promise((resolve, reject) => {
            VK.Auth.login((response) => {
                response.session ? resolve(true) : reject({message: 'oops something went wrong'});
            });
        });
    }

    public getLoginStatus(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            VK.Auth.getLoginStatus((response) => {
                response.session ? resolve(true) : reject(false);
            });
        });
    }
}
