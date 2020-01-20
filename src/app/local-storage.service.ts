import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DATA } from 'common/constants';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    constructor() {}

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
