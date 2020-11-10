import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';
import { map, tap } from 'rxjs/operators';
import { User } from '../user';
import { Store } from '@ngrx/store';
import { selectUserStatus } from 'src/store/selectors/users.selector';

@Injectable({
    providedIn: 'root',
})
export class CanActivateGuardService implements CanActivate {
    constructor(private store: Store, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.store.select(selectUserStatus)
            .pipe(
                tap(s => {
                    if (!s) {
                        this.router.navigate(['/login']);
                    }
                })
            );
    }
}
