import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './authorization.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    public user: string;
    constructor(private authService: AuthorizationService) {}

    authenticated() {
        return this.authService.isAuthenticated();
    }

    ngOnInit() {}

    showUser() {
        if (!!this.authService.currentUser) {
            this.user = this.authService.currentUser.firstName +
                ' ' + this.authService.currentUser.lastName;
        }
    }
}
