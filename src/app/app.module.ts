import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AddUserComponent } from './add-user/add-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {AuthInterceptor} from './interceptor';
import {LoginContainerComponent} from './login/login.container';
import { AccountComponent } from './account/account.component';
import {AccountContainerComponent} from './account/account.container';
import {AddUserContainerComponent} from './add-user/add-user.container';
import {AddUserGuard} from './add-user/add-user.guard';
import { MenuComponent } from './menu/menu.component';
import { AddPetsComponent } from './add-pets/add-pets.component';
import {LoginGuard} from './login/login.guard';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailComponent,
    AddUserComponent,
    DashboardComponent,
    LoginComponent,
    LoginContainerComponent,
    AccountComponent,
    AccountContainerComponent,
    AddUserContainerComponent,
    MenuComponent,
    AddPetsComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [     {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
    AddUserGuard,
  LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
