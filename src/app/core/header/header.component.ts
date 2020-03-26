import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserStatus, selectCurrentUser } from 'src/store/selectors/users.selector';
import { map } from 'rxjs/operators';
import { UserLogOff } from 'src/store/actions/users.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    userStatus$: Observable<boolean>;
    userName$: Observable<string>;

    constructor(public authService: AuthorizationService, private store: Store) {}

    ngOnInit() {
        this.userStatus$ = this.store.pipe(select(selectUserStatus));
        this.userName$ = this.store.pipe(
            select(selectCurrentUser),
            map((user) => {
                return `${user.firstName} ${user.lastName}`;
            })
        );
    }

    logOff() {
        this.authService.logout();
        this.store.dispatch(new UserLogOff());
    }
}
