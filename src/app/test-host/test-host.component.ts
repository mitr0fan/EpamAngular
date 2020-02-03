import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from '../course';
import { CourseItemComponent } from '../courses-list/course-item/course-item.component';

@Component({
    selector: 'app-test-host',
    templateUrl: './test-host.component.html',
    styleUrls: ['./test-host.component.scss'],
})
export class TestHostComponent {
    public parentCourse: Course = {
        id: 1,
        title: 'Video 1',
        date: '10.12.19',
        duration: 103,
        description: 'lalala',
        topRated: false,
        authors: [],
    };

    @ViewChild(CourseItemComponent, { static: false })
    public childComponent: CourseItemComponent;

    constructor() {}

    deleteCourse(id: number) {
        return id;
    }

    editCourse() {
        return;
    }
}
