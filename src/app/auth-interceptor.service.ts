import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { DATA } from 'common/constants';
import { AuthorizationService } from './authorization.service';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private localStorage: LocalStorageService, private auth: AuthorizationService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const tokenFromLocalStorage = this.localStorage.getItem(DATA.LOCAL_STORAGE.authToken);
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${tokenFromLocalStorage}`),
        });

        return next.handle(authReq).pipe(
            tap(() => {},
            (error) => {
                this.auth.logout();
                console.log(error);
                alert('Ошибка ' + error.status + ': ' + error.statusText);
            })
        );
    }
}
