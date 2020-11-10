import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { trigger, style, animate, transition, query } from '@angular/animations';
import { debounceTime } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { GetUserInfoFromLocalStorage } from 'src/store/actions/users.actions';
import { selectLoadingStatus } from 'src/store/selectors/users.selector';

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
    public loadingStatus$: Observable<boolean>;
    private subscribtion: Subscription = new Subscription();

    constructor(
        private router: Router,
        public store: Store
    ) {}

    ngOnInit() {
        this.store.dispatch(new GetUserInfoFromLocalStorage());

        this.loadingStatus$ = this.store.select(selectLoadingStatus)
            .pipe(debounceTime(100));

        const sub1 = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                if (event.url.includes('courses')) {
                    this.path = event.url.slice(1);
                } else {
                    this.path = '';
                }
            }
        });

        this.subscribtion.add(sub1);
    }

    ngOnDestroy() {
        this.subscribtion.unsubscribe();
    }

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
    }
}
