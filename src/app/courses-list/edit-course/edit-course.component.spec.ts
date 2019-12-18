import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseComponent } from './edit-course.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoursesService } from 'src/app/courses.service';
import { DurationPipe } from 'src/app/duration.pipe';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DirectivesPipesModule } from 'src/app/directives-pipes/directives-pipes.module';

describe('EditCourseComponent', () => {
    let component: EditCourseComponent;
    let fixture: ComponentFixture<EditCourseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditCourseComponent],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: CoursesService, useValue: {} },
                { provide: DurationPipe, useValue: {} },
            ],
            imports: [DirectivesPipesModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditCourseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
