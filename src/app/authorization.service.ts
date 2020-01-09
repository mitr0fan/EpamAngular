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

    login(email: string, pass: string) {
        this.getUserInfo(email)
        .subscribe(user => {
            const userFromServer = user[0];

            if (!!userFromServer && userFromServer.password === pass) {
                this.signedIn = !this.signedIn;
                this.localStorageService.addToken(this.tokenGenerator(), email);
            }
        });
    }

    logout() {
        this.signedIn = !this.signedIn;

        this.deleteToken();
    }

    isAuthenticated(): boolean {
        if (!!this.localStorageService.getItem(this.tokenFromServer)) {
            this.signedIn = true;

            const emailFromLocalStorage = this.localStorageService.getItem(this.tokenFromServer);
            this.currentUser = this.getUserInfo(emailFromLocalStorage);
        }
        return this.signedIn;
    }

    getUserInfo(email: string) {
        const url = `${DATA.USERS_SERVER}?email=${email}`;

        return this.http.get<User[]>(url);
    }

    deleteToken() {
        this.localStorageService.removeToken(this.tokenFromServer);
    }

    tokenGenerator() {
        let token = Math.ceil(Math.random()*1000) + 'AuthToken' + Math.ceil(Math.random()*1000);
        return token;
    }
}
