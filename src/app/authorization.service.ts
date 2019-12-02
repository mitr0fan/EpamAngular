import { Injectable } from '@angular/core';
import { fakeUsers } from 'common/constants';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private signedIn = false;

  constructor() { }

  login(email: string, pass: string) {
    const user = this.getUserInfo(email);

    if (user !== undefined && user.password === pass) {
      this.signedIn = !this.signedIn;
    }
  }

  logout() {
    this.signedIn = !this.signedIn;
  }

  isAuthenticated(): boolean {
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
}
