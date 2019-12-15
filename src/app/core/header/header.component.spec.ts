import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthorizationService } from 'src/app/authorization.service';
import { LocalStorageService } from 'src/app/local-storage.service';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let authServiceMock: Partial<AuthorizationService>;
    const localStorageService = jasmine.createSpyObj('LocalStorageService', ['getItem', 'addToken', 'removeToken']);
    localStorageService.getItem.and.returnValue('Jack Sparrow');

    authServiceMock = {
        isAuthenticated: () => true,
        logout: () => {},
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            providers: [{ provide: AuthorizationService, useValue: authServiceMock },
                { provide: LocalStorageService, useValue: localStorageService }
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;

        component.userName = 'Luke Skywalker';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show user name from inpur variable', () => {
        const login = fixture.nativeElement.querySelector('.header__login');
        expect(login.textContent).toBe('Luke Skywalker');
    });

    it('logOff should call logout method', () => {
        const authService = TestBed.get(AuthorizationService);
        const spy = spyOn(authService, 'logout');
        component.logOff();
        expect(spy).toHaveBeenCalled();
    });

    it('logOff should not call logout method', () => {
        const authService = TestBed.get(AuthorizationService);
        authService.isAuthenticated = () => false;
        const spy = spyOn(authService, 'logout');
        component.logOff();
        expect(spy).toHaveBeenCalledTimes(0);
    });

    it('should return authorization status', () => {
        expect(component.showLogOffButton()).toBe(true);
    });

    describe('When ngOnInit is run', () => {
        it('should receiving userNameFromToken value', () => {
            component.ngOnInit();
            expect(component.userNameFromToken).toEqual('Jack Sparrow');
        });
    });
});
