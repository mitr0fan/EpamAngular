import { Injectable } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class LoginGuardService implements CanActivate {
    constructor(private authService: AuthorizationService, private router: Router) {}

    canActivate(): boolean {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/courses']);
            return false;
        } else {
            return true;
        }
    }
}
