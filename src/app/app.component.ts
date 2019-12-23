import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    public user: string;
    public path;

    constructor(private authService: AuthorizationService, private router: Router) {}

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.path = event.url.slice(1);
            }
        });
    }

    authenticated() {
        return this.authService.isAuthenticated();
    }
}
