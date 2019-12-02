import { Component, OnInit, Input } from '@angular/core';
import { AuthorizationService } from 'src/app/authorization.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
    @Input() userName: string;
    public userNameFromToken: string;

    constructor( private authService: AuthorizationService) {}

    ngOnInit() {
        if (!!localStorage.getItem('token')) {
            this.userNameFromToken = localStorage.getItem('token');
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
