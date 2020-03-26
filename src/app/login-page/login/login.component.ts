import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoadUser } from 'src/store/actions/users.actions';

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

    constructor(private store: Store) {}

    login() {
        if (this.loginForm.valid) {
            this.store.dispatch(new LoadUser({ credentials: this.loginForm.value }));
        }
    }
}
