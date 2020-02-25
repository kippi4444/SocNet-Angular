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
import {MessagesComponent} from './components/messages/messages.component';
import {DialogsComponent} from './pages/dialogs/dialogs.component';


//

const routes: Routes = [
  { path: 'friends', component: FriendsComponent, canActivate: [AddUserGuard]},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dialogs', component: DialogsComponent, canActivate: [AddUserGuard], children: [
      { path: ':id', component: MessagesComponent, canActivate: [AddUserGuard]  }
    ] },
  { path: 'users/:id', component: AccountContainerComponent},
  { path: 'users/:id/albums', component: MyAlbumsContainerComponent, canActivate: [AddUserGuard]},
  { path: 'album/:id', component: AlbumContainerComponent, canActivate: [AddUserGuard]},
  { path: 'login', component: LoginContainerComponent, canActivate: [LoginGuard]},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
