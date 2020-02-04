import {NgModule, OnInit} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {LoginContainerComponent} from './login/login.container';
import {AccountContainerComponent} from './account/account.container';
import {AddUserGuard} from './add-user/add-user.guard';
import {LoginGuard} from './login/login.guard';
import {UserService} from './services/user.service';
import {MainComponent} from './main/main.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users/:id', component: AccountContainerComponent, canActivate: [AddUserGuard]},
  { path: 'login', component: LoginContainerComponent},
  { path: 'account', component: AccountContainerComponent, canActivate: [AddUserGuard]},
  { path: 'main', component: MainComponent},
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
