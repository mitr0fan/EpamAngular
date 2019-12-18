import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/course';
import { CoursesService } from 'src/app/courses.service';
import { DurationPipe } from 'src/app/duration.pipe';

@Component({
    selector: 'app-edit-course',
    templateUrl: './edit-course.component.html',
    styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent {
    constructor(
        private reference: MatDialogRef<EditCourseComponent>,
        @Inject(MAT_DIALOG_DATA) public course: Course,
        private coursesService: CoursesService,
        private durationPipe: DurationPipe
    ) {}

    close() {
        this.reference.close();
    }

    edit(
        titleContent: string,
        dateContent: string,
        durationContent: any,
        descriptionContent: string
    ) {
        const newCourse: Course = {
            id: this.course.id,
            title: titleContent,
            date: dateContent,
            duration: this.durationPipe.changeDurationFromMinutesToMs(durationContent),
            description: descriptionContent,
            topRated: this.course.topRated,
        };
        this.coursesService.createCourse(newCourse);

        this.reference.close();
    }
}
