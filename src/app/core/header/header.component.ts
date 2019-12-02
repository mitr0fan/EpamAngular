import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/authorization.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

    public login = '';

    constructor( private authService: AuthorizationService) {}

    ngOnInit() {}

    logOff() {
        if (this.authService.isAuthenticated()) {
            this.authService.logout();
        }
    }
}
