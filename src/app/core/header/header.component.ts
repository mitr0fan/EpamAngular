import { Component, OnInit, Input } from '@angular/core';
import { AuthorizationService } from 'src/app/authorization.service';
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    @Input() userName: string;
    public userNameFromToken: string;

    constructor(private authService: AuthorizationService, private localStorageService: LocalStorageService) {}

    ngOnInit() {
        if (!!this.localStorageService.getItem(this.authService.TOKEN_KEY)) {
            this.userNameFromToken = this.localStorageService.getItem(this.authService.TOKEN_KEY);
        }
    }

    logOff() {
        if (this.authService.isAuthenticated()) {
            this.authService.logout();
        }
    }

    showLogOffButton() {
        return this.authService.isAuthenticated();
    }
}
