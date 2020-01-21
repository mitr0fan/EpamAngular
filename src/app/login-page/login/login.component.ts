import { Component } from '@angular/core';
import { AuthorizationService } from 'src/app/authorization.service';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    constructor(private authService: AuthorizationService, private router: Router) {}

    login(email: string, pass: string) {
        this.authService
            .login(email, pass)
            .pipe(
                switchMap((response) => {
                    return this.authService.getUserFromServer(email, response.accessToken).pipe(
                        tap((user) => {
                            this.authService.addDataToLocalStorage(user[0]);
                            this.router.navigate(['/courses']);
                        })
                    );
                })
            )
            .subscribe();
    }
}
