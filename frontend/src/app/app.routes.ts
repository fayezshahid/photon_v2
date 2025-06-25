import { Routes } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { ArchivedComponent } from './components/archived/archived.component';
import { TrashComponent } from './components/trash/trash.component';
import { ExploreComponent } from './components/explore/explore.component';
import { AlbumComponent } from './components/album/album.component';
import { AlbumImagesComponent } from './components/albumimages/albumimages.component';
import { SharingComponent } from './components/sharing/sharing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
  { path: '', redirectTo: '/photos', pathMatch: 'full' },
  { path: 'photos', component: GalleryComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'sharing', component: SharingComponent }, 
  { path: 'archived', component: ArchivedComponent }, 
  { path: 'favourites', component: FavouritesComponent }, 
  { path: 'albums', component: AlbumComponent },
  { path: 'album/:id', component: AlbumImagesComponent },
  { path: 'trash', component: TrashComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'signup', component: SignupComponent }, 
  { path: '**', redirectTo: '/photos' } // wildcard route for 404
];