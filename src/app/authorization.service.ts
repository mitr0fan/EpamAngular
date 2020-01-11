import { Injectable } from '@angular/core';
import { DATA } from 'common/constants';
import { User } from './user';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthorizationService {
    constructor(private localStorageService: LocalStorageService, private http: HttpClient) {}

    login(emailProperty: string, pass: string) {
        const url = `${DATA.SERVER}/login`;
        const bodyRequest = {
            email: emailProperty,
            password: pass
        };

        this.http.post<{accessToken: string}>(url, bodyRequest)
        .subscribe(response => {
            this.http.get<User[]>(`${DATA.USERS_SERVER}?email=${emailProperty}`)
            .subscribe(user => {
                this.localStorageService.addToken(
                    DATA.LOCAL_STORAGE.userInfo,
                    JSON.stringify(user[0])
                );
                const tokenFromServer = response.accessToken;
                this.localStorageService.addToken(DATA.LOCAL_STORAGE.authToken, tokenFromServer);
            });
        });
    }

    logout() {
        this.deleteToken();
    }

    getUserInfo() {
        if (this.localStorageService.getItem(DATA.LOCAL_STORAGE.userInfo)) {
            const user: User = JSON.parse(this.localStorageService.getItem(DATA.LOCAL_STORAGE.userInfo));
            const url = `${DATA.SERVER}/600/users/${user.id}`;
            return this.http.get(url);
        } else {
            return of(false);
        }
    }

    deleteToken() {
        this.localStorageService.removeToken(DATA.LOCAL_STORAGE.authToken);
        this.localStorageService.removeToken(DATA.LOCAL_STORAGE.userInfo);
    }
}
