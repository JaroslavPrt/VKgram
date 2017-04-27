import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

import { LoginComponent } from './components/login/login.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { AlbumPhotosComponent } from './components/album-photos/album-photos.component';
import { PhotoComponent } from './components/photo/photo.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'albums',
        component: AlbumsComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'albums/:id',
        component: AlbumPhotosComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'photo/:id',
        component: PhotoComponent,
        canActivate: [ AuthGuard ]
    },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
}
