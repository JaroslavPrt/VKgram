import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { VkService } from './services/vk.service';
import { AuthGuard } from './services/auth.guard';
import { BodyScrollDirective } from './directives/body-scroll.directive';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { HeaderComponent } from './components/header/header.component';
import { AlbumPhotosComponent } from './components/album-photos/album-photos.component';
import { PhotoComponent } from './components/photo/photo.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        AlbumsComponent,
        HeaderComponent,
        AlbumPhotosComponent,
        PhotoComponent,
        BodyScrollDirective,
        UploadComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [
        VkService,
        AuthGuard
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
