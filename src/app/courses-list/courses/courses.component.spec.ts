import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './courses.component';
import { DirectivesPipesModule } from 'src/app/directives-pipes/directives-pipes.module';
import { CoreModule } from 'src/app/core/core.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CoursesService } from 'src/app/courses.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Course } from 'src/app/course';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteCoursePopupComponent } from '../delete-course-popup/delete-course-popup.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('CoursesComponent', () => {
    let component: CoursesComponent;
    let fixture: ComponentFixture<CoursesComponent>;
    let coursesService: Partial<CoursesService>;
    let fakeCourses: Course[];

    const dialog = jasmine.createSpyObj('MatDialog', ['open']);
    dialog.open.and.returnValue({
        afterClosed() {
            return {
                toPromise() {
                    return {
                        then(callback) {
                            return callback();
                        },
                    };
                },
            };
        },
    });

    fakeCourses = [
        {
            id: 1,
            title: 'Video 1',
            date: '10.12.19',
            duration: 103,
            description: 'lalala',
            topRated: false,
        },
        {
            id: 2,
            title: 'Video 2',
            date: '11.12.19',
            duration: 120,
            description: 'lalala',
            topRated: true,
        },
    ];

    coursesService = {
        getList: () => fakeCourses,
        createCourse: () => {
            fakeCourses.push({
                id: 3,
                title: 'Video 3',
                date: '01.12.19',
                duration: 150,
                description: 'lalala',
                topRated: false,
            });
        },
        updateItem: () => {},
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CoursesComponent, DeleteCoursePopupComponent],
            imports: [
                DirectivesPipesModule,
                CoreModule,
                MatDialogModule,
                BrowserAnimationsModule,
                BrowserDynamicTestingModule,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: CoursesService, useValue: coursesService },
                { provide: MatDialog, useValue: dialog },
            ],
        })
            .overrideModule(BrowserDynamicTestingModule, {
                set: { entryComponents: [DeleteCoursePopupComponent] },
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CoursesComponent);
        component = fixture.componentInstance;
        fakeCourses.length = 2;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should make list of courses', () => {
        const coursesElements = fixture.nativeElement.querySelectorAll('app-course-item');
        expect(coursesElements.length).toBe(2);
    });

    it('should create new course', () => {
        component.createNewCourse();
        fixture.detectChanges();
        const coursesElements = fixture.nativeElement.querySelectorAll('app-course-item');
        expect(coursesElements.length).toBe(3);
    });

    it('createNewCourse() should call CoursesService.createCourse()', () => {
        const coursesServiceInstance = TestBed.get(CoursesService);
        const spy = spyOn(coursesServiceInstance, 'createCourse');
        component.createNewCourse();
        expect(spy).toHaveBeenCalled();
    });

    it('update() should call CoursesService.updateItem()', () => {
        const coursesServiceInstance = TestBed.get(CoursesService);
        const spy = spyOn(coursesServiceInstance, 'updateItem');
        component.update();
        expect(spy).toHaveBeenCalled();
    });

    it('search() should change inputSearch value', () => {
        const testValue = 'Hello world';
        component.search(testValue);
        expect(component.inputSearch).toBe(testValue);
    });

    it('deleteCourse()', () => {
        const service = TestBed.get(MatDialog);
        component.deleteCourse(1);
        expect(service.open).toHaveBeenCalledTimes(1);
    });
});
