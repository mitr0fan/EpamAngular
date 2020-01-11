import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/authorization.service';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public show;
    constructor(public authService: AuthorizationService, private router: Router) {}

    logOff() {
        if (false) {
            this.authService.logout();
            this.router.navigate(['/login']);
        }
    }

    showLogOffButton() {
        return false;
    }
}
