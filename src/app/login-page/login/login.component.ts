import { Component } from '@angular/core';
import { AuthorizationService } from 'src/app/authorization.service';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    public loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    constructor(private authService: AuthorizationService, private router: Router) {}

    login() {
        if (this.loginForm.valid) {
            this.authService
                .login(this.loginForm.value)
                .pipe(
                    switchMap((response) => {
                        return this.authService.getUserFromServer(this.loginForm.value.email, response.accessToken).pipe(
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
}
