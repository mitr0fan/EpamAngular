import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCoursePopupComponent } from './delete-course-popup.component';

describe('DeleteCoursePopupComponent', () => {
    let component: DeleteCoursePopupComponent;
    let fixture: ComponentFixture<DeleteCoursePopupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DeleteCoursePopupComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeleteCoursePopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
