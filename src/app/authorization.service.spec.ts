import { TestBed } from '@angular/core/testing';

import { AuthorizationService } from './authorization.service';
import { fakeUsers } from '../../common/constants';
import { LocalStorageService } from './local-storage.service';

describe('AuthorizationService', () => {
    let service: AuthorizationService;
    let localStorageService = {
        getItem: (key: string) => 'Jack Sparrow',
        addToken: () => {},
        removeToken: () => {}
    };

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [AuthorizationService,
            {provide: LocalStorageService, useValue: localStorageService}]
        }),
        service = TestBed.get(AuthorizationService);
        localStorageService = TestBed.get(LocalStorageService);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('email and password are correct should call localStorageService.addToken()', () => {
        const spy = spyOn(localStorageService, 'addToken');
        service.login('email1', '0000');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(service.isAuthenticated()).toBe(true);
    });

    it('email and password are not correct should not call localStorageService.addToken()', () => {
        const spy = spyOn(localStorageService, 'addToken');
        service.login('', '');
        localStorageService.getItem = (key) => '';
        expect(spy).toHaveBeenCalledTimes(0);
        expect(service.isAuthenticated()).toBe(false);
        localStorageService.getItem = (key) => 'Jack Sparrow';
    });

    it('should return user object', () => {
        expect(service.getUserInfo('email2')).toEqual(fakeUsers[1]);
    });

    it('should changed service.signedIn and call service.deleteToken()', () => {
        const spy = spyOn(service, 'deleteToken');
        service.logout();
        expect(service.isAuthenticated()).toEqual(true);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return service.signedIn', () => {
        localStorageService.getItem = (key) => '';
        expect(service.isAuthenticated()).toBe(false);
        localStorageService.getItem = (key) => 'Jack Sparrow';
        expect(service.isAuthenticated()).toEqual(true);
    });

    it('should call localStorageService.removeToken()', () => {
        const spy = spyOn(localStorageService, 'removeToken');
        service.deleteToken();
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
