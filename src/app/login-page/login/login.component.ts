import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/authorization.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    constructor(private authService: AuthorizationService, private router: Router) {}

    ngOnInit() {
        this.authService.getUserInfo().subscribe((data) => {
            if (data) {
                this.router.navigate(['/courses']);
            }
        });
    }

    login(email: string, pass: string) {
        this.authService.login(email, pass).subscribe((response) => {
                this.authService.getUserFromServer(email).subscribe((user) => {
                    this.authService.addDataToLocalStorage(user, response);
                    this.router.navigate(['/courses']);
                });
            },
            (error) => console.log(error)
        );
    }
}
