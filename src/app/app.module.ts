import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FriendsComponent } from './pages/friends/friends.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddUserComponent } from './components/add-user/add-user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {LoginContainerComponent} from './pages/login/login.container';
import { AccountComponent } from './pages/account/account.component';
import {AccountContainerComponent} from './pages/account/account.container';
import {AddUserGuard} from './guards/add-user.guard';
import { MenuComponent } from './pages/menu/menu.component';
import { AddPetsComponent } from './components/add-pets/add-pets.component';
import {LoginGuard} from './guards/login.guard';
import { DragDropUploadComponent } from './components/drag-drop-upload/drag-drop-upload.component';
import { MyAlbumsComponent } from './pages/my-albums/my-albums.component';
import {MyAlbumsContainerComponent} from './pages/my-albums/my-albums.container';
import { NgxFileDropModule } from 'ngx-file-drop';
import { AlbumComponent } from './pages/album/album.component';
import {AlbumContainerComponent} from './pages/album/album.container';
import { AlbumModalComponent } from './components/album-modal/album-modal.component';
import { UserPhotosComponent } from './components/user-photos/user-photos.component';
import {UserPhotosContainerComponent} from './components/user-photos/user-photos.container';
import { HtmlSafePipe } from './html-safe.pipe';
import { PhotoViewerComponent } from './components/photo-viewer/photo-viewer.component';
import { WallComponent } from './components/wall/wall.component';
import { MessagesComponent } from './components/messages/messages.component';
import {WebsocketService} from './services/websocket.service';
import { DialogsComponent } from './pages/dialogs/dialogs.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './store/effects/user.effects';
import {appReducers} from './store/reducers/app.reducers';
import {DashboardContainerComponent} from './pages/dashboard/dashboard.container';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {DialogsContainerComponent} from './pages/dialogs/dialogs.container';
import {ExtraForUserEffects} from './store/effects/extraForUser.effects';
import {FriendshipEffects} from './store/effects/friendship.effects';
import {UserPhotos} from './store/effects/photo.effects';
import { PaginationComponent } from './components/pagination/pagination.component';
import {MessageEffects} from './store/effects/message.effects';
import {MessagesContainerComponent} from './components/messages/messages.container';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { CreateDialogComponent } from './components/create-dialog/create-dialog.component';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    FriendsComponent,
    AddUserComponent,
    DashboardComponent,
    DashboardContainerComponent,
    LoginComponent,
    LoginContainerComponent,
    AccountComponent,
    AccountContainerComponent,
    MenuComponent,
    AddPetsComponent,
    DragDropUploadComponent,
    MyAlbumsComponent,
    MyAlbumsContainerComponent,
    AlbumComponent,
    AlbumContainerComponent,
    AlbumModalComponent,
    UserPhotosComponent,
    UserPhotosContainerComponent,
    HtmlSafePipe,
    PhotoViewerComponent,
    WallComponent,
    MessagesComponent,
    DialogsComponent,
    DialogsContainerComponent,
    PaginationComponent,
    MessagesContainerComponent,
    FooterComponent,
    CreateDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxFileDropModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([UserEffects, ExtraForUserEffects, FriendshipEffects, UserPhotos, MessageEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],

  ],
  providers: [     {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
    { provide: LOCALE_ID, useValue: 'ru' },
    AddUserGuard,
  LoginGuard,
  WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
