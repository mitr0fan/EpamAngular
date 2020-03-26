import { TestBed } from '@angular/core/testing';

import { CoursesEffectService } from './courses.effect.service';

describe('Courses.EffectService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: CoursesEffectService = TestBed.get(CoursesEffectService);
        expect(service).toBeTruthy();
    });
});
