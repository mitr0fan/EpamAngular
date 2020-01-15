import { Component } from '@angular/core';
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
        this.authService.login(email, pass).subscribe((response) => {
            this.authService.getUserFromServer(email, response.accessToken).subscribe((user) => {
                this.authService.addDataToLocalStorage(user[0]);
                this.router.navigate(['/courses']);
            });
        });
    }
}
