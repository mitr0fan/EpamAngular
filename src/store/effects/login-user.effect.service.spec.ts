import { TestBed } from '@angular/core/testing';

import { LoginUserEffects } from './login-user.effect.service';

describe('LoginUser.EffectService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: LoginUserEffects = TestBed.get(LoginUserEffects);
        expect(service).toBeTruthy();
    });
});
