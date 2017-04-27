import { Component } from '@angular/core';
import { VkService } from '../services/vk.service';
import { Http } from '@angular/http';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
    providers: [ VkService ]
})
export class UploadComponent {

    image: any;

    constructor(
        private vkService: VkService,
        private http: Http
    ) { }

    load() {
        this.vkService.serverUploadUrl()
            .then(url => this.loadPhoto(url))
            .catch(e => console.log(e));
    }

    loadPhoto (url) {
        let data = new FormData();
        data.append('file1', this.image);

        this.http.post(url, data)
            .toPromise()
            .then(res => console.dir(res.json().data))
            .catch(console.dir);
    }

    changeListener(event: any) {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e: any) => {
                this.image = e.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }
}
