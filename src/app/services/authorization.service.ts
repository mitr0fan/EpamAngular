import { Injectable } from '@angular/core';
import { DATA } from 'common/constants';
import { User } from '../user';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthorizationService {
    constructor(
        private localStorageService: LocalStorageService,
        private http: HttpClient,
        private router: Router
    ) {}

    login(formValue: { email: string; password: string }) {
        const url = `${DATA.SERVER}/login`;
        const bodyRequest = formValue;

        return this.http.post<{ user: Partial<User>, access_token: string }>(url, bodyRequest);
    }

    logout() {
        this.router.navigate(['/login']);
        this.deleteToken();
    }

    getUserInfo() {
        if (this.localStorageService.getItem(DATA.LOCAL_STORAGE.userInfo)) {
            const user: User = JSON.parse(
                this.localStorageService.getItem(DATA.LOCAL_STORAGE.userInfo)
            );
            const url = `${DATA.SERVER}/users/${user.id}`;
            return this.http.get(url);
        } else {
            return of(false);
        }
    }

    deleteToken() {
        this.localStorageService.removeToken(DATA.LOCAL_STORAGE.authToken);
        this.localStorageService.removeToken(DATA.LOCAL_STORAGE.userInfo);
    }

    addDataToLocalStorage(user: Partial<User>) {
        const changedUser = {
            userName: `${user.firstName} ${user.lastName}`,
            id: user.id,
        };
        this.localStorageService.addToken(DATA.LOCAL_STORAGE.userInfo, JSON.stringify(changedUser));
    }

    register(data: Partial<User>) {
        const url = `${DATA.SERVER}/register`;

        return this.http.post<{user: User, access_token: string}>(url, data);
    }
}
