import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {LoginContainerComponent} from './login/login.container';
import {UserDetailGuard} from './user-detail/user-detail.guard';
import {AccountContainerComponent} from './account/account.container';
import {AddUserContainerComponent} from './add-user/add-user.container';
import {AddUserGuard} from './add-user/add-user.guard';

const routes: Routes = [
  { path: 'users', component: UsersComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users/:id', component: UserDetailComponent, canActivate: [UserDetailGuard]},
  { path: 'adduser', component: AddUserContainerComponent, canActivate: [AddUserGuard]},
  { path: 'login', component: LoginContainerComponent},
  { path: 'account', component: AccountContainerComponent, canActivate: [UserDetailGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
