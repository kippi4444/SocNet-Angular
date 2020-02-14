import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LoginContainerComponent} from './pages/login/login.container';
import {AccountContainerComponent} from './pages/account/account.container';
import {AddUserGuard} from './guards/add-user.guard';
import {LoginGuard} from './guards/login.guard';
import {AlbumContainerComponent} from './pages/album/album.container';
import {MyAlbumsContainerComponent} from './pages/my-albums/my-albums.container';
import {AddUserComponent} from './components/add-user/add-user.component';
import {AddUserContainerComponent} from './components/add-user/add-user.container';
import {PhotoViewerComponent} from './components/photo-viewer/photo-viewer.component';


const routes: Routes = [
  { path: 'friends', component: UsersComponent, canActivate: [AddUserGuard]},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users/:id', component: AccountContainerComponent},
  { path: 'users/:id/albums', component: MyAlbumsContainerComponent, canActivate: [AddUserGuard]},
  { path: 'album/:id', component: AlbumContainerComponent, canActivate: [AddUserGuard]},
  { path: 'login', component: LoginContainerComponent, canActivate: [LoginGuard], children: [
      { path: 'registration', component: AddUserContainerComponent, canActivate: [LoginGuard]},
    ]},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
