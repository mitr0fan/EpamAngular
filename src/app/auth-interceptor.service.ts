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
import { LoadingService } from './loading.service';

@Injectable({
    providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
    constructor(
        private localStorage: LocalStorageService,
        private auth: AuthorizationService,
        private snackBar: MatSnackBar,
        private loadingService: LoadingService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const tokenFromLocalStorage = this.localStorage.getItem(DATA.LOCAL_STORAGE.authToken);
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${tokenFromLocalStorage}`),
        });
        this.loadingService.showLoading.next(true);

        return next.handle(authReq).pipe(
            tap(
                (res) => {
                    if (res instanceof HttpResponse) {
                        if (res.url === 'http://localhost:3000/660/users/1') {
                            this.loadingService.showLoading.next(false);
                        }
                    }
                },
                (error) => {
                    this.loadingService.showLoading.next(false);
                    let errorMessage: string;
                    if (error.status === 400) {
                        errorMessage = `Ошибка: ${error.error}. Введите данные заново`;
                    } else {
                        this.auth.logout();
                        errorMessage = `Ошибка: ${error.statusText}.`;
                    }
                    this.snackBar.open(errorMessage, 'Закрыть', {
                        duration: 0,
                    });
                },
                () => {
                    this.loadingService.showLoading.next(false);
                }
            )
        );
    }
}
