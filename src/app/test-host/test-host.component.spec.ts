import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestHostComponent } from './test-host.component';
import { CourseItemComponent } from '../courses-list/course-item/course-item.component';
import { DirectivesPipesModule } from '../directives-pipes/directives-pipes.module';

describe('TestHostComponent', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let childComponent: CourseItemComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestHostComponent, CourseItemComponent],
            imports: [DirectivesPipesModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        childComponent = component.childComponent;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('check data-bound course property from TestHostComponent to CoursesItemComponent', () => {
        expect(childComponent.course).toEqual(component.parentCourse);
    });

    it('CoursesItemComponent method delete() should call TestHostComponent method deleteCourse()', () => {
        const spy = spyOn(component, 'deleteCourse');
        childComponent.delete(1);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('CoursesItemComponent method edit() should call TestHostComponent method editCourse()', () => {
        const spy = spyOn(component, 'editCourse');
        childComponent.edit();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('call HostTest methods', () => {
        expect(component.editCourse()).toBe(undefined);
        expect(component.deleteCourse(1)).toBe(1);
    });
});
