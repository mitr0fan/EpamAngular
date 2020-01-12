import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { Router, NavigationEnd } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { DATA } from 'common/constants';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    public path;
    public userFromLocalStorage;

    constructor(private router: Router, private localStorage: LocalStorageService) {}

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                if (event.url.includes('courses')) {
                    this.path = event.url.slice(1);
                } else {
                    this.path = '';
                }
                if (event.url !== '/login') {
                    this.userFromLocalStorage =
                        JSON.parse(
                            this.localStorage.getItem(DATA.LOCAL_STORAGE.userInfo)
                            ).firstName +
                        ' ' +
                        JSON.parse(
                            this.localStorage.getItem(DATA.LOCAL_STORAGE.userInfo)
                            ).lastName;
                } else {
                    this.userFromLocalStorage = '';
                }
            }
        });
    }
}
