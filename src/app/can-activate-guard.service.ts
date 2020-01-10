import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthorizationService } from './authorization.service';

@Injectable({
    providedIn: 'root',
})
export class CanActivateGuardService implements CanActivate {
    constructor(private authService: AuthorizationService, private router: Router) {}

    canActivate(): boolean {
        if (this.authService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
