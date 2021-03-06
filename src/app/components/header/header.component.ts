import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { VkService } from '../../services/vk.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [ VkService ]
})
export class HeaderComponent {

    @Input('image-url') imageUrl: string;
    @Input('title') title: string;
    @Input() type = 'all';

    constructor(
        private vkService: VkService,
        private router: Router,
        private location: Location
    ) {}

    signOut() {
        this.vkService.signOut()
            .then(() => this.router.navigate(['/login']))
            .catch(error => console.log(error.message));
    }

    isAllAlbums() {
        return this.type === 'all';
    }

    goBack() {
        this.location.back();
    }
}
