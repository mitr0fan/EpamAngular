import { TestBed } from '@angular/core/testing';

import { AuthorizationService } from './authorization.service';
import { fakeUsers } from '../../common/constants';

describe('AuthorizationService', () => {
    let service: AuthorizationService;

    beforeEach(() => {
        TestBed.configureTestingModule({providers: [AuthorizationService]}),
        service = TestBed.get(AuthorizationService);
        localStorage.clear();
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should return authorization status - false', () => {
        expect(service.isAuthenticated()).toBe(false);
    });

    it('should return user object', () => {
        expect(service.getUserInfo('email2')).toEqual(fakeUsers[1]);
    });

    it('email and password are correct set localStorage token', () => {
        service.login('email1', '0000');
        expect(localStorage.getItem('tokenAuthorization')).toEqual('Jack Sparrow');
        expect(service.isAuthenticated()).toBe(true);
    });

    it('email and password are not correct and localStorage token is false', () => {
        service.login('email1', '1111');
        expect(!!localStorage.getItem('tokenAuthorization')).toEqual(false);
        expect(service.isAuthenticated()).toBe(false);
    });

    it('logout should change authorization status and remove token', () => {
        service.login('email1', '0000');
        expect(service.isAuthenticated()).toBe(true);
        service.logout();
        expect(service.isAuthenticated()).toBe(false);
        expect(!!localStorage.getItem('tokenAuthorization')).toBe(false);
    });

    it('should remove token from localStorage', () => {
        service.login('email1', '0000');
        expect(localStorage.getItem('tokenAuthorization')).toEqual('Jack Sparrow');
        service.deleteToken();
        expect(!!localStorage.getItem('tokenAuthorization')).toEqual(false);
    });
});
