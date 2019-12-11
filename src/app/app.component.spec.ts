import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { fakeUsers } from 'common/constants';
import { AuthorizationService } from './authorization.service';

describe('AppComponent', () => {
    const authService = { isAuthenticated: () => true, currentUser: fakeUsers[1] };
    let fixture: ComponentFixture<AppComponent>;
    let app: DebugElement;
    let component: AppComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [{ provide: AuthorizationService, useValue: authService }],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        app = fixture.debugElement.componentInstance;
        component = fixture.componentInstance;
        component.user = 'Jack Sparrow';
    });

    it('should create the app', () => {
        expect(app).toBeTruthy();
    });

    it('authenticated() should return true', () => {
        expect(component.authenticated()).toEqual(true);
    });

    it('showUser() should change component.user when authService.currentUser is exist', () => {
        expect(component.user).toEqual('Jack Sparrow');
        component.showUser();
        expect(component.user).toEqual('Luke Skywalker');
    });

    it('showUser() should not change component.user when authService.currentUser is not exist', () => {
        const authServiceInstance = TestBed.get(AuthorizationService);
        authServiceInstance.currentUser = undefined;
        expect(component.user).toEqual('Jack Sparrow');
        component.showUser();
        expect(component.user).toEqual('Jack Sparrow');
    });
});
