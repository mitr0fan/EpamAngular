import { Component, Input } from '@angular/core';
import { AuthorizationService } from 'src/app/authorization.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    @Input() showUser: string;
    constructor(
        public authService: AuthorizationService,
        private router: Router,
    ) {}

    logOff() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
