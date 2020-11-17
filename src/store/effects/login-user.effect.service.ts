import { Injectable } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    UsersActions,
    LoadUser,
    LoadUserSuccess,
    LoadUserError,
    ChangeUserStatus,
    RegisterUser,
} from '../actions/users.actions';
import { switchMap, catchError, mergeMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/user';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { DATA } from 'common/constants';

@Injectable()
export class LoginUserEffects {
    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UsersActions.LoadUser),
            switchMap((action: LoadUser) => {
                const data = action.payload.credentials;
                return this.authService.login(data).pipe(
                    mergeMap((res) => {
                        this.ls.addToken(DATA.LOCAL_STORAGE.authToken, res.access_token);
                        const changedUser = {
                            id: res.user.id,
                            firstName: res.user.firstName,
                            lastName: res.user.lastName,
                        };
                        this.authService.addDataToLocalStorage(res.user);
                        this.router.navigate(['/courses']);
                        return [
                            new LoadUserSuccess({ user: changedUser }),
                            new ChangeUserStatus({ loggedIn: true }),
                        ];
                    }),
                    catchError((error: HttpErrorResponse) =>
                        mergeMap(() => [
                            new LoadUserError({
                                error: { errorMessage: error.error, errorStatus: true },
                                user: LoadUserError.user,
                            }),
                            new ChangeUserStatus({ loggedIn: false }),
                        ])
                    )
                );
            })
        );
    });

    getUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UsersActions.GetUserInfoFromLocalStorage),
            switchMap(() => {
                return this.authService.getUserInfo().pipe(
                    mergeMap((user: User) => {
                        if (user) {
                            const changedUser = {
                                id: user.id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                            };
                            return [
                                new LoadUserSuccess({ user: changedUser }),
                                new ChangeUserStatus({ loggedIn: true }),
                            ];
                        } else {
                            return [];
                        }
                    })
                );
            })
        );
    });

    userLogOff$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UsersActions.UserLogOff),
            mergeMap(() => [
                new ChangeUserStatus({ loggedIn: false }),
                new LoadUserSuccess({ user: { id: null, firstName: '', lastName: '' } }),
            ])
        );
    });

    registerUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UsersActions.RegisterUser),
            switchMap((action: RegisterUser) => this.authService.register(action.payload.data).pipe(
                mergeMap(res => {
                    this.router.navigate(['/courses']);
                    this.authService.addDataToLocalStorage(res.user);
                    this.ls.addToken(DATA.LOCAL_STORAGE.authToken, res.access_token);

                    return [
                    new LoadUserSuccess({ user: res.user }),
                    new ChangeUserStatus({ loggedIn: true }),
                    ];
                })
            ))
        );
    });

    constructor(
        private authService: AuthorizationService,
        private actions$: Actions,
        private router: Router,
        private ls: LocalStorageService,
    ) {}
}
