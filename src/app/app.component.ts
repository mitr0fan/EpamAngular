import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { DATA } from 'common/constants';
import {
    trigger,
    style,
    animate,
    transition,
    query,
    animateChild,
    group,
} from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('routeAnimations', [
            transition('CoursesPage <=> EditPage, LoginPage <=> CoursesPage', [
                style({ position: 'relative' }),
                query(':enter', [
                    style({
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                    }),
                ]),
                query(':enter', [style({ top: '-500px' })]),
                query(':enter', [animate('300ms ease-out', style({ top: '0px' }))]),
            ]),
        ]),
    ],
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
                if (event.url !== '/login' && event.url !== '/') {
                    this.userFromLocalStorage = JSON.parse(
                        this.localStorage.getItem(DATA.LOCAL_STORAGE.userInfo)
                    ).userName;
                } else {
                    this.userFromLocalStorage = '';
                }
            }
        });
    }

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
    }
}
