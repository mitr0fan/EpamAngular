import { Injectable } from '@angular/core';
import { DATA } from 'common/constants';
import { User } from './user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthorizationService {
    private signedIn = false;
    public currentUser: User;
    public TOKEN_KEY = 'tokenAuthorization';

    constructor(private localStorageService: LocalStorageService) {}

    login(email: string, pass: string) {
        const user = this.getUserInfo(email);

        if (!!user && user.password === pass) {
            this.signedIn = !this.signedIn;
            this.currentUser = user;

            this.localStorageService.addToken(this.TOKEN_KEY, email);
        }
    }

    logout() {
        this.signedIn = !this.signedIn;

        this.deleteToken();
    }

    isAuthenticated(): boolean {
        if (!!this.localStorageService.getItem(this.TOKEN_KEY)) {
            this.signedIn = true;

            const emailFromLocalStorage = this.localStorageService.getItem(this.TOKEN_KEY);
            this.currentUser = this.getUserInfo(emailFromLocalStorage);
        }
        return this.signedIn;
    }

    getUserInfo(email: string) {
        let user: User;

        DATA.FAKE_USERS.forEach((i) => {
            if (i.email === email) {
                user = i;
            }
        });

        return user;
    }

    deleteToken() {
        this.localStorageService.removeToken(this.TOKEN_KEY);
    }
}
