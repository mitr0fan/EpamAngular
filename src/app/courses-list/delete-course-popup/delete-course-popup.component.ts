import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
    selector: 'app-delete-course-popup',
    templateUrl: './delete-course-popup.component.html',
    styleUrls: ['./delete-course-popup.component.scss'],
})
export class DeleteCoursePopupComponent {
    constructor(
        private reference: MatDialogRef<DeleteCoursePopupComponent>,
        private courseService: CoursesService,
        @Inject(MAT_DIALOG_DATA) private id: any
    ) {}

    closePopup() {
        this.reference.close();
    }

    removeCourse() {
        this.courseService.removeItem(this.id.idCourse).subscribe(() => this.reference.close());
    }
}
