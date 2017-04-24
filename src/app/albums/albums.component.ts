import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VkService } from '../services/vk.service';
import { User } from '../models/user.model';
import { Album } from '../models/album.model';

@Component({
    selector: 'app-albums',
    templateUrl: './albums.component.html',
    styleUrls: ['./albums.component.scss'],
    providers: [ VkService ]
})
export class AlbumsComponent implements OnInit {

    user: User;
    albums: Album[] = [];

    constructor(
        private vkService: VkService,
        private router: Router
    ) { }

    ngOnInit() {
        this.vkService.userInfo()
            .then((user) => this.user = user)
            .catch((error) => console.log(error.message));

        this.vkService.getAlbums()
            .then((albums) => this.albums = albums)
            .catch((error) => console.log(error.message));
    }

    signOut() {
        this.vkService.signOut()
            .then(() => this.router.navigate(['/login']))
            .catch((error) => console.log(error.message));
    }

    openAlbum(album) {
        console.dir(album.id);
    }
}
