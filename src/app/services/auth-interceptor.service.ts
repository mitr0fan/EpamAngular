import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { DATA } from 'common/constants';
import { AuthorizationService } from './authorization.service';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { LoadUserError, ChangeUserStatus, ChangeLoadingStatus } from 'src/store/actions/users.actions';

@Injectable({
    providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
    constructor(
        private localStorage: LocalStorageService,
        private auth: AuthorizationService,
        private snackBar: MatSnackBar,
        private store: Store
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const tokenFromLocalStorage = this.localStorage.getItem(DATA.LOCAL_STORAGE.authToken);
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${tokenFromLocalStorage}`),
        });
        this.store.dispatch(new ChangeLoadingStatus({ status: true }));

        return next.handle(authReq).pipe(
            tap(
                () => {},
                (error) => {
                    this.store.dispatch(new ChangeLoadingStatus({ status: false }));
                    let errorMessage: string;
                    if (error.status === 400) {
                        errorMessage = `Ошибка: ${error.error}. Введите данные заново`;
                    } else {
                        this.auth.logout();
                        errorMessage = `Ошибка: ${error.statusText}.`;
                    }
                    this.store.dispatch(
                        new LoadUserError({
                            error: { errorStatus: true, errorMessage },
                            user: LoadUserError.user,
                        })
                    );
                    this.store.dispatch(new ChangeUserStatus({ loggedIn: false }));
                    this.snackBar.open(errorMessage, 'Закрыть', {
                        duration: 0,
                    });
                },
                () => {
                    this.store.dispatch(new ChangeLoadingStatus({ status: false }));
                }
            )
        );
    }
}
