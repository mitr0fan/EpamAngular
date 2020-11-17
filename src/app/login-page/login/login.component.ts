import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { LoadUser, RegisterUser } from 'src/store/actions/users.actions';

enum LoginTabs {
    Login = 0,
    Register,
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    activeTab$ = new BehaviorSubject<LoginTabs>(LoginTabs.Login);
    LoginTabs = LoginTabs;

    public loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    registerForm: FormGroup;

    constructor(private store: Store, private fb: FormBuilder) {}

    ngOnInit() {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required]],
            firstName: '',
            lastName: '',
            password: ['', [Validators.required]],
        });
    }

    login() {
        if (this.loginForm.valid) {
            this.store.dispatch(new LoadUser({ credentials: this.loginForm.value }));
        }
    }

    register() {
        if (this.registerForm.valid) {
            this.store.dispatch(new RegisterUser({ data: this.registerForm.value }));
        }
    }

    changeTab(tab: LoginTabs) {
        this.activeTab$.next(tab);
    }
}
