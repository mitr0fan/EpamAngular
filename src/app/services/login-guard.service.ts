import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class LoginGuardService implements CanActivate {
    constructor(private authService: AuthorizationService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.authService.getUserInfo().pipe(
            map((data) => {
                if (data) {
                    this.router.navigate(['/courses']);
                    return false;
                } else {
                    return true;
                }
            })
        );
    }
}
