import { Injectable } from '@angular/core';
import { DATA } from 'common/constants';
import { User } from './user';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class AuthorizationService {
    private signedIn = false;
    public currentUser: User;
    private tokenFromServer: string;

    constructor(private localStorageService: LocalStorageService, private http: HttpClient) {}

    login(emailProperty: string, pass: string) {
        const url = `${DATA.SERVER}/login`;
        const bodyRequest = {
            email: emailProperty,
            password: pass
        };

        this.http.post<{accessToken:string}>(url, bodyRequest)
        .subscribe(response => {
            this.tokenFromServer = response.accessToken;
            this.signedIn = !this.signedIn;
            this.localStorageService.addToken('authToken', this.tokenFromServer);
        });
    }

    logout() {
        this.signedIn = !this.signedIn;

        this.deleteToken();
    }

    isAuthenticated(id: number) {
        const url = `${DATA.SERVER}/600/users/`;
    }

    getUserInfo(email: string) {
        const url = `${DATA.USERS_SERVER}?email=${email}`;

        return this.http.get<User[]>(url);
    }

    deleteToken() {
        this.localStorageService.removeToken(this.tokenFromServer);
    }
}
