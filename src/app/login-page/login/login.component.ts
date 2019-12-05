import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthorizationService } from 'src/app/authorization.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    @Output() loginEvent = new EventEmitter();
    public email: string;
    public password: string;

    constructor(private authService: AuthorizationService) {}

    login() {
        if (!this.authService.isAuthenticated()) {
            this.authService.login(this.email, this.password);
            this.loginEvent.emit();
        }
    }
}
