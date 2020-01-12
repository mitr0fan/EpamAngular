import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthorizationService } from './authorization.service';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CanActivateGuardService implements CanActivate {
    constructor(private authService: AuthorizationService, private router: Router) {}

    canActivate(): boolean {
        this.authService.getUserInfo().subscribe((data) => {
            if (!data) {
                this.router.navigate(['/login']);
            }
        });
        return true;
    }
}
