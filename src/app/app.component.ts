import { Component } from '@angular/core';
import { AuthorizationService } from './authorization.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public user: string;
    constructor(private authService: AuthorizationService) {}

    authenticated() {
        return this.authService.isAuthenticated();
    }

    showUser() {
        if (!!this.authService.currentUser) {
            this.user =
                this.authService.currentUser.firstName +
                ' ' +
                this.authService.currentUser.lastName;
        }
    }
}
