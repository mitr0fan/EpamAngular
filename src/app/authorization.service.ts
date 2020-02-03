import { Injectable } from '@angular/core';
import { DATA } from 'common/constants';
import { User } from './user';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { of, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthorizationService {
    public userName$ = new Subject<string>();

    constructor(
        private localStorageService: LocalStorageService,
        private http: HttpClient,
        private router: Router
    ) {}

    login(formValue: { email: string; password: string }) {
        const url = `${DATA.SERVER}/login`;
        const bodyRequest = formValue;

        return this.http.post<{ accessToken: string }>(url, bodyRequest);
    }

    logout() {
        this.router.navigate(['/login']);
        this.userName$.next('');
        this.deleteToken();
    }

    getUserInfo() {
        if (this.localStorageService.getItem(DATA.LOCAL_STORAGE.userInfo)) {
            const user: User = JSON.parse(
                this.localStorageService.getItem(DATA.LOCAL_STORAGE.userInfo)
            );
            const url = `${DATA.SERVER}/660/users/${user.id}`;
            return this.http.get(url);
        } else {
            return of(false);
        }
    }

    deleteToken() {
        this.localStorageService.removeToken(DATA.LOCAL_STORAGE.authToken);
        this.localStorageService.removeToken(DATA.LOCAL_STORAGE.userInfo);
    }

    getUserFromServer(emailProperty: string, token: string) {
        this.localStorageService.addToken(DATA.LOCAL_STORAGE.authToken, token);
        return this.http.get<User[]>(`${DATA.USERS_SERVER}?email=${emailProperty}`);
    }

    addDataToLocalStorage(user: User) {
        const changedUser = {
            userName: `${user.firstName} ${user.lastName}`,
            id: user.id,
        };
        this.localStorageService.addToken(DATA.LOCAL_STORAGE.userInfo, JSON.stringify(changedUser));
    }
}
