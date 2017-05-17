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

import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { IAppState } from './redux/IAppState';
import { INITIAL_STATE, rootReduser} from './redux/store';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        AlbumsComponent,
        HeaderComponent,
        AlbumPhotosComponent,
        PhotoComponent,
        BodyScrollDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        NgReduxModule
    ],
    providers: [
        VkService,
        AuthGuard
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
    constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension) {
        const storeEnhancers = devTools.isEnabled() ? [ devTools.enhancer() ] : [];
        ngRedux.configureStore(rootReduser, INITIAL_STATE, [], storeEnhancers);
    }
}
