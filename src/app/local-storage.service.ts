import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  addToken(key: string, token: string) {
    localStorage.setItem(key, token);
  }

  removeToken(key: string) {
    localStorage.removeItem(key);
  }
}
