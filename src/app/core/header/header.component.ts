import { Component, Input } from '@angular/core';
import { AuthorizationService } from 'src/app/authorization.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    @Input() showUser: string;
    constructor(public authService: AuthorizationService) {}

    logOff() {
        this.authService.logout();
    }
}
