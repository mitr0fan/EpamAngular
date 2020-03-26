import { Injectable } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    UsersActions,
    LoadUser,
    LoadUserSuccess,
    LoadUserError,
    ChangeUserStatus,
} from '../actions/users.actions';
import { switchMap, catchError, mergeMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/user';
import { Router } from '@angular/router';

@Injectable()
export class LoginUserEffects {
    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UsersActions.LoadUser),
            switchMap((action: LoadUser) => {
                const data = action.payload.credentials;
                return this.authService.login(data).pipe(
                    switchMap((response) =>
                        this.authService.getUserFromServer(data.email, response.accessToken).pipe(
                            mergeMap((user) => {
                                const changedUser = {
                                    id: user[0].id,
                                    firstName: user[0].firstName,
                                    lastName: user[0].lastName,
                                };
                                this.authService.addDataToLocalStorage(user[0]);
                                this.router.navigate(['/courses']);
                                return [
                                    new LoadUserSuccess({ user: changedUser }),
                                    new ChangeUserStatus({ loggedIn: true }),
                                ];
                            })
                        )
                    ),
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

    constructor(
        private authService: AuthorizationService,
        private actions$: Actions,
        private router: Router
    ) {}
}
