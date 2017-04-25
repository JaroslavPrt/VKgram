import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { VkService } from '../services/vk.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [ VkService ]
})
export class LoginComponent implements OnInit {

    constructor(
        private vkService: VkService,
        private router: Router
    ) {}

    ngOnInit() {
        this.vkService.loginStatus()
            .then(() => this.redirectToAlbums());
    }

    singIn() {
        this.vkService.signIn()
            .then(() => this.redirectToAlbums())
            .catch(error => console.log('login', error.message));
    }

    private redirectToAlbums() {
        this.router.navigate(['/albums']);
    }
}
