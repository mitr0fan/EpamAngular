import { Injectable } from '@angular/core';
import { fakeUsers } from 'common/constants';
import { User } from './user';

@Injectable({
    providedIn: 'root',
})
export class AuthorizationService {
    private signedIn = false;
    public currentUser: User;

    constructor() {}

    login(email: string, pass: string) {
        const user = this.getUserInfo(email);

        if (!!user && user.password === pass) {
            this.signedIn = !this.signedIn;
            this.currentUser = user;
            console.log('Logged in successfully');

            localStorage.setItem('tokenAuthorization', `${user.firstName} ${user.lastName}`);
        }
    }

    logout() {
        this.signedIn = !this.signedIn;

        this.deleteToken();
    }

    isAuthenticated(): boolean {
        if (!!localStorage.getItem('tokenAuthorization')) {
            this.signedIn = true;
        }
        return this.signedIn;
    }

    getUserInfo(email: string) {
        let user: User;

        fakeUsers.forEach((i) => {
            if (i.email === email) {
                user = i;
            }
        });

        return user;
    }

    deleteToken() {
        localStorage.removeItem('tokenAuthorization');
    }
}
