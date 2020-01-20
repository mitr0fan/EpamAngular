import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import {
    trigger,
    style,
    animate,
    transition,
    query,
} from '@angular/animations';
import { LoadingService } from './loading.service';
import { debounceTime } from 'rxjs/operators';

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
export class AppComponent implements OnInit, OnDestroy {
    public path;
    public loadingStatus: boolean;

    constructor(
        private router: Router,
        public loadingService: LoadingService
    ) {}

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                if (event.url.includes('courses')) {
                    this.path = event.url.slice(1);
                } else {
                    this.path = '';
                }
            }
        });

        this.loadingService.showLoading.pipe(
            debounceTime(50)
        ).subscribe(value => {
            this.loadingStatus = value;
        });
    }

    ngOnDestroy() {
        this.loadingService.showLoading.unsubscribe();
    }

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
    }
}
