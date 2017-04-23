import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { VkService } from '../services/vk.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [ VkService ]
})
export class LoginComponent {

    constructor(
        private vkService: VkService,
        private router: Router
    ) {}

    singIn() {
        this.vkService.signIn()
            .then(() => this.redirectToAlbums())
            .catch((error) => console.log('login', error.message));
    }

    private redirectToAlbums() {
        this.router.navigate(['/albums']);
    }
}
