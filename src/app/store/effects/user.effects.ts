import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  AddDialog,
  AddDialogFailure,
  AddDialogSuccess,
  AddPet,
  AddPetFailure,
  AddPetSuccess,
  ChangeAvatar, ChangeAvatarFailure, ChangeAvatarSuccess,
  DelDialog,
  DelDialogFailure,
  DelDialogSuccess,
  DeletedPet,
  DeletedPetFailure,
  DeletedPetSuccess,
  DeleteUser,
  DeleteUserFailure,
  DeleteUserSuccess,
  GetAuthUser,
  GetAuthUserFailure,
  GetAuthUserSuccess,
  GetLoginUser,
  GetLoginUserDialogs,
  GetLoginUserDialogsFailure,
  GetLoginUserDialogsSuccess,
  GetLoginUserFailure,
  GetLoginUserSuccess,
  GetLogoutUser,
  GetLogoutUserFailure,
  GetLogoutUserSuccess, GetScrollMes, GetScrollMesFailure, GetScrollMesSuccess,
  GetSelectedDialog,
  GetSelectedDialogFailure,
  GetSelectedDialogSuccess,
  NewUser,
  NewUserFailure,
  NewUserSuccess,
  SetAvatar,
  SetAvatarFailure,
  SetAvatarSuccess,
  UpdatedUser,
  UpdatedUserFailure,
  UpdatedUserSuccess,
  UserActions
} from '../actions/user.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Data, UserService} from '../../services/user.service';
import {Store} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {User} from '../../interfaces/user';
import {of} from 'rxjs';
import {SearchService} from '../../services/search.service';
import {Router} from '@angular/router';
import {Pet} from '../../interfaces/pet';
import {PetService} from '../../services/pet.service';
import {Dialog} from '../../interfaces/dialog';
import {dialogMes, DialogService} from '../../services/dialog.service';
import {AddPhoto, AddPhotoSuccess} from '../actions/photo.actions';
import {Photo} from '../../interfaces/photo';
import {SelectedAuthUserChangeAvatar, SelectedAuthUserChangeAvatarSuccess} from '../actions/extraForUser.actions';
import {WebsocketService} from '../../services/websocket.service';

@Injectable()
export class UserEffects {

  @Effect()
  newUser$ = this.actions$.pipe(
    ofType<NewUser>(UserActions.NEW_USER),
    switchMap((action: NewUser) => this.userService.add(action.payload)),
    map((res) => {
      if (res.status === 201) {
        localStorage.setItem('accessToken', res.body.token);
        localStorage.setItem('user', res.body.user._id);
        localStorage.setItem('login', res.body.user.login);
        this.router.navigate(['/users/' + res.body.user.login]);
        return new NewUserSuccess(res.body.user);
      }
    }),
    catchError((err) => of(new NewUserFailure(err)))
  );

  @Effect()
  updatedUser$ = this.actions$.pipe(
    ofType<UpdatedUser>(UserActions.UPDATED_USER),
    switchMap((action: UpdatedUser) => this.userService.update(action.payload)),
    map((res) => {
      if (res.status === 201) {
        return new UpdatedUserSuccess(res.body);
      }
    }),
    catchError((err) => of(new UpdatedUserFailure(err)))
  );

  @Effect()
  deletedUser$ = this.actions$.pipe(
    ofType<DeleteUser>(UserActions.DEL_USER),
    switchMap((action: DeleteUser) => this.userService.del(action.payload)),
    map((res) => {
      if (res.status === 201) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        localStorage.removeItem('login');
        this.router.navigate(['/login']);
        return new DeleteUserSuccess();
      }
    }),
    catchError((err) => of(new DeleteUserFailure(err)))
  );

  @Effect()
  addPet$ = this.actions$.pipe(
    ofType<AddPet>(UserActions.ADD_PET),
    switchMap((action: AddPet) => this.petService.addPet(action.payload)),
    map((pet: Pet) => new AddPetSuccess(pet)),
    catchError((err) => of(new AddPetFailure(err)))
    );

  @Effect()
  delPet$ = this.actions$.pipe(
    ofType<DeletedPet>(UserActions.DEL_PET),
    switchMap((action: DeletedPet) => this.petService.delPet(action.payload)),
    map((res: string) => new DeletedPetSuccess(res)),
    catchError((err) => of(new DeletedPetFailure(err)))
    );

  @Effect()
  getAuthUser$ = this.actions$.pipe(
    ofType<GetAuthUser>(UserActions.GET_AUTH_USER),
    switchMap(() => this.userService.getAuthUser()),
    map((user: User) => new GetAuthUserSuccess(user)),
    catchError((err) => of(new GetAuthUserFailure(err)))
  );

  @Effect()
  getLoginUser$ = this.actions$.pipe(
    ofType<GetLoginUser>(UserActions.GET_LOGIN_USER),
    switchMap((action: GetLoginUser) => this.userService.login(action.payload)),
    map((user: Data) => {
      localStorage.setItem('accessToken', user.token);
      localStorage.setItem('user', user.user._id);
      localStorage.setItem('login', user.user.login);
      this.router.navigate(['/users/' + user.user.login]);
      return new GetLoginUserSuccess(user.user);
    }),
    catchError((err) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      localStorage.removeItem('login');
      this.router.navigate(['/login']);
      return of(new GetLoginUserFailure(err))})
  );

  @Effect()
  getLogoutUser$ = this.actions$.pipe(
    ofType<GetLogoutUser>(UserActions.GET_LOGOUT_USER),
    switchMap((action: GetLogoutUser) => this.userService.logout()),
    map((res) => {
      if (res.status === 200) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        localStorage.removeItem('login');
        this.router.navigate(['/login']);
        return new GetLogoutUserSuccess();
      }
    }),
    catchError((err) => of(new GetLogoutUserFailure(err)))
  );

  @Effect()
  getLoginUserDialogs$ = this.actions$.pipe(
    ofType<GetLoginUserDialogs>(UserActions.GET_LOGIN_USER_DIALOGS),
    switchMap(( ) => this.dialogService.getAllDialogs()),
    map((dialogs: Dialog[]) => new GetLoginUserDialogsSuccess(dialogs)),
    catchError((err) => of(new GetLoginUserDialogsFailure(err)))
  );

  @Effect()
  getSelectedDialog$ = this.actions$.pipe(
    ofType<GetSelectedDialog>(UserActions.GET_SELECTED_DIALOG),
    switchMap((action: GetSelectedDialog) => this.socketService.getAllMes(action.payload)),
    switchMap((dialog: dialogMes) => of(new GetSelectedDialogSuccess(dialog))),
    catchError((err) => of(new GetSelectedDialogFailure(err)))
  );

  @Effect()
  getScrollMes$ = this.actions$.pipe(
    ofType<GetScrollMes>(UserActions.SCROLL_MES),
    switchMap((action: GetScrollMes) => this.socketService.getScrollMes(action.payload)),
    switchMap((dialog: dialogMes) => of(new GetScrollMesSuccess(dialog))),
    catchError((err) => of(new GetScrollMesFailure(err)))
  );

  @Effect()
  getAddDialog$ = this.actions$.pipe(
    ofType<AddDialog>(UserActions.ADD_DIALOG),
    switchMap((action: AddDialog) => this.dialogService.addDialog(action.payload)),
    map((dialog: Dialog) => new AddDialogSuccess(dialog)),
    catchError((err) => of(new AddDialogFailure(err)))
  );

  @Effect()
  setAvatar$ = this.actions$.pipe(
    ofType<SetAvatar>(UserActions.SET_AVATAR),
    switchMap((action: SetAvatar) => this.userService.setAvatar(action.payload)),
    switchMap((res) => [new SetAvatarSuccess(res.body), new AddPhotoSuccess([res.body])]),
    catchError((err) => of(new SetAvatarFailure(err)))
  );

  @Effect()
  changeAvatar$ = this.actions$.pipe(
    ofType<ChangeAvatar>(UserActions.CHANGE_AVATAR),
    switchMap((action: ChangeAvatar) => this.userService.changeAvatar(action.payload)),
    switchMap((photo: Photo) => [
      new SelectedAuthUserChangeAvatarSuccess(photo),
      new ChangeAvatarSuccess(photo),
      new AddPhotoSuccess([photo])]),
    catchError((err) => of(new ChangeAvatarFailure(err)))
  );

  @Effect()
  delDialog$ = this.actions$.pipe(
    ofType<DelDialog>(UserActions.DEL_DIALOG),
    switchMap((action: DelDialog) => this.dialogService.delDialog(action.payload)),
    map((id: string ) => new DelDialogSuccess(id)),
    catchError((err) => of(new DelDialogFailure(err)))
  );

  constructor(private userService: UserService,
              private petService: PetService,
              private dialogService: DialogService,
              private searchService: SearchService,
              private socketService: WebsocketService,
              private actions$: Actions,
              private router: Router,
              private store: Store<AppState>) {}
}
