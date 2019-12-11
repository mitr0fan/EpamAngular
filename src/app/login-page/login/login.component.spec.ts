import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorizationService } from 'src/app/authorization.service';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    const authService = {isAuthenticated: () => false, login: () => {}};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [MatInputModule, FormsModule, BrowserAnimationsModule],
            providers: [{provide: AuthorizationService, useValue: authService}]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call authService.login() and loginEvent.emit()', () => {
        const authServiceInstance = TestBed.get(AuthorizationService);
        const spyOnAuthService = spyOn(authServiceInstance, 'login');
        const spyOnLoginEvent = spyOn(component.loginEvent, 'emit');
        component.login();
        expect(spyOnAuthService).toHaveBeenCalledTimes(1);
        expect(spyOnLoginEvent).toHaveBeenCalledTimes(1);
    });

    it('should call authService.login() and loginEvent.emit()', () => {
        const authServiceInstance = TestBed.get(AuthorizationService);
        authServiceInstance.isAuthenticated = () => true;
        const spyOnAuthService = spyOn(authServiceInstance, 'login');
        const spyOnLoginEvent = spyOn(component.loginEvent, 'emit');
        component.login();
        expect(spyOnAuthService).toHaveBeenCalledTimes(0);
        expect(spyOnLoginEvent).toHaveBeenCalledTimes(0);
    });
});
