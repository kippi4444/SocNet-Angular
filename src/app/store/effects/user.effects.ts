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
import {User} from '../../interfaces/user';
import {of} from 'rxjs';
import {SearchService} from '../../services/search.service';
import {Router} from '@angular/router';
import {Pet} from '../../interfaces/pet';
import {PetService} from '../../services/pet.service';
import {Dialog} from '../../interfaces/dialog';
import {DialogMes, DialogService} from '../../services/dialog.service';
import { AddPhotoSuccess} from '../actions/photo.actions';
import {Photo} from '../../interfaces/photo';
import {SelectedAuthUserChangeAvatarSuccess} from '../actions/extraForUser.actions';
import {WebsocketService} from '../../services/websocket.service';
import {GetError} from '../actions/errors.actions';

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
    catchError((err) => [new NewUserFailure(err), new GetError(err)])
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
    catchError((err) => [new UpdatedUserFailure(err), new GetError(err)])
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
    catchError((err) => [new DeleteUserFailure(err), new GetError(err)])
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
    catchError((err) => [new DeletedPetFailure(err), new GetError(err)])
    );

  @Effect()
  getAuthUser$ = this.actions$.pipe(
    ofType<GetAuthUser>(UserActions.GET_AUTH_USER),
    switchMap(() => this.userService.getAuthUser()
      .pipe(
        map((user: User) => new GetAuthUserSuccess(user)),
        catchError((err) =>{
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
          localStorage.removeItem('login');
          this.router.navigate(['/login']);
          return [new GetAuthUserFailure(err), new GetError(err)]}
        )
      )
    )
  );



  @Effect()
  getLoginUser$ = this.actions$.pipe(
    ofType<GetLoginUser>(UserActions.GET_LOGIN_USER),
    switchMap((action: GetLoginUser) => this.userService.login(action.payload)
      .pipe(
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
          return [new GetLoginUserFailure(err), new GetError(err)]}
        )
      )
    )
  );

  @Effect()
  getLogoutUser$ = this.actions$.pipe(
    ofType<GetLogoutUser>(UserActions.GET_LOGOUT_USER),
    switchMap((action: GetLogoutUser) => this.userService.logout()
      .pipe(
        map((res) => {
          if (res.status === 200) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            localStorage.removeItem('login');
            this.router.navigate(['/login']);
            return new GetLogoutUserSuccess();
          }
        }),
        catchError((err) => [new GetLogoutUserFailure(err), new GetError(err)])
      )
    ),
  );

  @Effect()
  getLoginUserDialogs$ = this.actions$.pipe(
    ofType<GetLoginUserDialogs>(UserActions.GET_LOGIN_USER_DIALOGS),
    switchMap(( ) => this.dialogService.getAllDialogs().pipe(
      map((dialogs: Dialog[]) => new GetLoginUserDialogsSuccess(dialogs)),
      catchError((err) => [new GetLoginUserDialogsFailure(err), new GetError(err)])
      )
    )
  );

  @Effect()
  getSelectedDialog$ = this.actions$.pipe(
    ofType<GetSelectedDialog>(UserActions.GET_SELECTED_DIALOG),
    switchMap((action: GetSelectedDialog) => this.socketService.getAllMes(action.payload)
      .pipe(
        switchMap((dialog: DialogMes) => of(new GetSelectedDialogSuccess(dialog))),
        catchError((err) => [new GetSelectedDialogFailure(err), new GetError(err)])
      )
    ),
  );

  @Effect()
  getScrollMes$ = this.actions$.pipe(
    ofType<GetScrollMes>(UserActions.SCROLL_MES),
    switchMap((action: GetScrollMes) => this.socketService.getScrollMes(action.payload)
      .pipe(
        switchMap((dialog: DialogMes) => of(new GetScrollMesSuccess(dialog))),
        catchError((err) => [new GetScrollMesFailure(err), new GetError(err)])
      )
    )
  );

  @Effect()
  getAddDialog$ = this.actions$.pipe(
    ofType<AddDialog>(UserActions.ADD_DIALOG),
    switchMap((action: AddDialog) => this.dialogService.addDialog(action.payload)
      .pipe(
        map((dialog: Dialog) => new AddDialogSuccess(dialog)),
        catchError((err) => [new AddDialogFailure(err), new GetError(err)])
      )
    )
  );

  @Effect()
  setAvatar$ = this.actions$.pipe(
    ofType<SetAvatar>(UserActions.SET_AVATAR),
    switchMap((action: SetAvatar) => this.userService.setAvatar(action.payload)
      .pipe(
        switchMap((res) => [new SetAvatarSuccess(res.body), new AddPhotoSuccess([res.body])]),
        catchError((err) => [new SetAvatarFailure(err), new GetError(err)])
      )
    )
  );

  @Effect()
  changeAvatar$ = this.actions$.pipe(
    ofType<ChangeAvatar>(UserActions.CHANGE_AVATAR),
    switchMap((action: ChangeAvatar) => this.userService.changeAvatar(action.payload)
      .pipe(
        switchMap((photo: Photo) => [
          new SelectedAuthUserChangeAvatarSuccess(photo),
          new ChangeAvatarSuccess(photo),
          new AddPhotoSuccess([photo])]),
        catchError((err) => [new ChangeAvatarFailure(err), new GetError(err)])
      )
    )
  );

  @Effect()
  delDialog$ = this.actions$.pipe(
    ofType<DelDialog>(UserActions.DEL_DIALOG),
    switchMap((action: DelDialog) => this.dialogService.delDialog(action.payload)
      .pipe(
        map((id: string ) => new DelDialogSuccess(id)),
        catchError((err) => [new DelDialogFailure(err), new GetError(err)])
      )
    )
  );

  constructor(private userService: UserService,
              private petService: PetService,
              private dialogService: DialogService,
              private searchService: SearchService,
              private socketService: WebsocketService,
              private actions$: Actions,
              private router: Router
  ) {}
}
