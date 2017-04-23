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
            VK.Auth.login((result) => {
                if (result.status === 'connected') {
                    resolve(true);
                } else {
                    reject({message: 'oops something went wrong'});
                }
            });
        });
    }

    public getLoginStatus() {
        VK.Auth.getLoginStatus((status) => {
            console.dir(status);
        });
    }
}
