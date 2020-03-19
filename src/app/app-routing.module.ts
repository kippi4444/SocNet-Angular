import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsComponent } from './pages/friends/friends.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LoginContainerComponent} from './pages/login/login.container';
import {AccountContainerComponent} from './pages/account/account.container';
import {AddUserGuard} from './guards/add-user.guard';
import {LoginGuard} from './guards/login.guard';
import {AlbumContainerComponent} from './pages/album/album.container';
import {MyAlbumsContainerComponent} from './pages/my-albums/my-albums.container';
import {DashboardContainerComponent} from './pages/dashboard/dashboard.container';
import {DialogsContainerComponent} from './pages/dialogs/dialogs.container';
import {MessagesContainerComponent} from './components/messages/messages.container';


const routes: Routes = [
  { path: 'friends/:id', component: FriendsComponent, canActivate: [AddUserGuard], data: {state: 'Friends'}},
  { path: 'dashboard', component: DashboardContainerComponent, data: {state: 'Dashboard'} },
  { path: 'dialogs', component: DialogsContainerComponent, canActivate: [AddUserGuard], data: {state: 'Dialogs'}, children: [
      { path: ':id', component: MessagesContainerComponent, canActivate: [AddUserGuard]  }
    ] },
  { path: 'users/:id', component: AccountContainerComponent, canActivate: [AddUserGuard], data: {state: 'Account'}},
  { path: 'users/:id/albums', component: MyAlbumsContainerComponent, canActivate: [AddUserGuard], data: {state: 'Albums'}},
  { path: 'album/:id', component: AlbumContainerComponent, canActivate: [AddUserGuard], data: {state: 'Album'}},
  { path: 'login', component: LoginContainerComponent, canActivate: [LoginGuard], data: {state: 'Login'}},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
