import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCoursePopupComponent } from './delete-course-popup.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoursesService } from 'src/app/courses.service';

describe('DeleteCoursePopupComponent', () => {
    let component: DeleteCoursePopupComponent;
    let fixture: ComponentFixture<DeleteCoursePopupComponent>;
    const matDialogRef = { close: () => {} };
    const coursesService = { removeItem: () => {} };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DeleteCoursePopupComponent],
            providers: [
                { provide: MatDialogRef, useValue: matDialogRef },
                { provide: CoursesService, useValue: coursesService },
                { provide: MAT_DIALOG_DATA, useValue: {} },
            ],
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

    it('closePopup() should call reference.close()', () => {
        const reference = TestBed.get(MatDialogRef);
        const spy = spyOn(reference, 'close');
        component.closePopup();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('removeCourse() should call coursesService.removeItem() and reference.close()', () => {
        const reference = TestBed.get(MatDialogRef);
        const coursesServiceInstance = TestBed.get(CoursesService);
        const spyToMatDialogRef = spyOn(reference, 'close');
        const spyToCoursesService = spyOn(coursesServiceInstance, 'removeItem');
        component.removeCourse();
        expect(spyToCoursesService).toHaveBeenCalledTimes(1);
        expect(spyToMatDialogRef).toHaveBeenCalledTimes(1);
    });
});
