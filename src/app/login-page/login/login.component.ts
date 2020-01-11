import { Component, Output, EventEmitter } from '@angular/core';
import { AuthorizationService } from 'src/app/authorization.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    constructor(private authService: AuthorizationService, private router: Router) {}

    login(email: string, pass: string) {
        if (true) {
            this.authService.login(email, pass);
            this.router.navigate(['/courses']);
        }
    }
}
