import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthorizationService } from './authorization.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
    providedIn: 'root',
})
export class CanActivateGuardService implements CanActivate {
    constructor(private authService: AuthorizationService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.authService.getUserInfo().pipe(
            map((data: User) => {
                if (data) {
                    const userName = `${data.firstName} ${data.lastName}`;
                    this.authService.userName$.next(userName);
                    return true;
                } else {
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        );
    }
}
