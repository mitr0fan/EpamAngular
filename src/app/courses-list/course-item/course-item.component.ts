import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    OnInit,
} from '@angular/core';
import { Course } from 'src/app/course';

@Component({
    selector: 'app-course-item',
    templateUrl: './course-item.component.html',
    styleUrls: ['./course-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseItemComponent {
    @Input() course: Course;
    @Output() deleteEvent: EventEmitter<number> = new EventEmitter();
    @Output() editEvent = new EventEmitter();

    constructor() {}

    delete(id: number) {
        this.deleteEvent.emit(id);
    }

    edit(id: number) {
        this.editEvent.emit(id);
    }
}
