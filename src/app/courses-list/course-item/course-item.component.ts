import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/course';

@Component({
    selector: 'app-course-item',
    templateUrl: './course-item.component.html',
    styleUrls: ['./course-item.component.css'],
})
export class CourseItemComponent implements OnInit {
    @Input() course: Course;
    @Output() deleteEvent: EventEmitter<number> = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    delete(id: number) {
        this.deleteEvent.emit(id);
    }
}
