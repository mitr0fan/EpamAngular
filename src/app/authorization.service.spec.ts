import { TestBed } from '@angular/core/testing';

import { AuthorizationService } from './authorization.service';
import { fakeUsers } from 'common/constants';

describe('AuthorizationService', () => {
    beforeEach(() => TestBed.configureTestingModule({providers: [AuthorizationService]}));

    it('should return fake User with name Luke', () => {
        const service: AuthorizationService = TestBed.get(AuthorizationService);
        expect(service.getUserInfo('email2')).toBeTruthy(fakeUsers[1]);
    });
});
