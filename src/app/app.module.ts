import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import {VkService} from './services/vk.service';
import { AlbumsComponent } from './albums/albums.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        AlbumsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [ VkService ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
