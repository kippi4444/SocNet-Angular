import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  AddDialog, AddDialogSuccess,
  AddPet, AddPetSuccess, DeletedPet, DeletedPetSuccess,
  DeleteUser, DeleteUserSuccess,
  GetAuthUser, GetAuthUserFailure,
  GetAuthUserSuccess,
  GetLoginUser, GetLoginUserDialogs, GetLoginUserDialogsSuccess, GetLoginUserFailure,
  GetLoginUserSuccess,
  GetLogoutUser, GetLogoutUserFailure,
  GetLogoutUserSuccess, GetSelectedDialog, GetSelectedDialogSuccess,
  NewUser, NewUserFailure,
  NewUserSuccess, SetAvatar, SetAvatarSuccess,
  UpdatedUser, UpdatedUserSuccess,
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
import {Photo} from '../../interfaces/photo';
import {Msg} from '../../interfaces/msg';
import {Friend} from '../../interfaces/friend';
import {GetAllRequestsFailure, GetAllRequestsSuccess} from '../actions/friendship.actions';



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
    switchMap((res) => {
      if (res.status === 201) {
       return of(new UpdatedUserSuccess(res.body));
      }
    }));

  @Effect()
  deletedUser$ = this.actions$.pipe(
    ofType<DeleteUser>(UserActions.DEL_USER),
    switchMap((action: DeleteUser) => this.userService.del(action.payload)),
    switchMap((res) => {
      if (res.status === 201) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        localStorage.removeItem('login');
        this.router.navigate(['/login']);
        return of(new DeleteUserSuccess());
      }
    })
  );

  @Effect()
  addPet$ = this.actions$.pipe(
    ofType<AddPet>(UserActions.ADD_PET),
    switchMap((action: AddPet) => this.petService.addPet(action.payload)),
    switchMap((pet: Pet) => of(new AddPetSuccess(pet)))
    );

  @Effect()
  delPet$ = this.actions$.pipe(
    ofType<DeletedPet>(UserActions.DEL_PET),
    switchMap((action: DeletedPet) => this.petService.delPet(action.payload)),
    switchMap((res: string) => of(new DeletedPetSuccess(res)))
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
    catchError((err) => of(new GetLoginUserFailure(err)))
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
    switchMap((dialogs: Dialog[]) => of(new GetLoginUserDialogsSuccess(dialogs)))
  );

  @Effect()
  getSelectedDialog$ = this.actions$.pipe(
    ofType<GetSelectedDialog>(UserActions.GET_SELECTED_DIALOG),
    switchMap((action: GetSelectedDialog) => this.dialogService.getMessages(action.payload)),
    switchMap((dialog: dialogMes) => of(new GetSelectedDialogSuccess(dialog)))
  );

  @Effect()
  getAddDialog$ = this.actions$.pipe(
    ofType<AddDialog>(UserActions.ADD_DIALOG),
    switchMap((action: AddDialog) => this.dialogService.addDialog(action.payload)),
    switchMap((dialog: Dialog) => of(new AddDialogSuccess(dialog))));

  @Effect()
  setAvatar$ = this.actions$.pipe(
    ofType<SetAvatar>(UserActions.SET_AVATAR),
    switchMap((action: SetAvatar) => this.userService.setAvatar(action.payload)),
    switchMap((res) => {
      return of(new SetAvatarSuccess(res.body));
    }));

  constructor(private userService: UserService,
              private petService: PetService,
              private dialogService: DialogService,
              private searchService: SearchService,
              private actions$: Actions,
              private router: Router,
              private store: Store<AppState>) {}
}
