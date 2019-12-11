import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemComponent } from './course-item.component';
import { DirectivesPipesModule } from 'src/app/directives-pipes/directives-pipes.module';
import { Course } from 'src/app/course';

describe('CourseItemComponent', () => {
    let component: CourseItemComponent;
    let fixture: ComponentFixture<CourseItemComponent>;
    let fakeCourse: Course;

    fakeCourse = {
        id: 1,
        title: 'Video 1',
        date: '10.12.19',
        duration: 103,
        description: 'lalala',
        topRated: false,
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CourseItemComponent],
            imports: [DirectivesPipesModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseItemComponent);
        component = fixture.componentInstance;
        component.course = fakeCourse;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('shuold emit deleteEvent', () => {
        const spy = spyOn(component.deleteEvent, 'emit');
        component.delete(1);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('shuold emit editEvent', () => {
        const spy = spyOn(component.editEvent, 'emit');
        component.edit();
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
