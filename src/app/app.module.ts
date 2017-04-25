import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { AlbumsComponent } from './albums/albums.component';
import { VkService } from './services/vk.service';
import { AuthGuard } from './services/auth.guard';
import { HeaderComponent } from './header/header.component';
import { AlbumPhotosComponent } from './album-photos/album-photos.component';
import { PhotoComponent } from './photo/photo.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        AlbumsComponent,
        HeaderComponent,
        AlbumPhotosComponent,
        PhotoComponent
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
