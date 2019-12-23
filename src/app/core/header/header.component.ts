import { Component } from '@angular/core';
import { AuthorizationService } from 'src/app/authorization.service';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    constructor(public authService: AuthorizationService, private router: Router) {}

    logOff() {
        if (this.authService.isAuthenticated()) {
            this.authService.logout();
            this.router.navigate(['/login']);
        }
    }

    showLogOffButton() {
        return this.authService.isAuthenticated();
    }
}
