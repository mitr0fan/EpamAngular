import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoursesService } from 'src/app/courses.service';

@Component({
    selector: 'app-delete-course-popup',
    templateUrl: './delete-course-popup.component.html',
    styleUrls: ['./delete-course-popup.component.css'],
})
export class DeleteCoursePopupComponent implements OnInit {
    constructor(
        private reference: MatDialogRef<DeleteCoursePopupComponent>,
        private courseService: CoursesService,
        @Inject(MAT_DIALOG_DATA) private id: any
    ) {}

    ngOnInit() {}

    closePopup() {
        this.reference.close();
    }

    removeCourse() {
        this.courseService.removeItem(this.id.idCourse);
        this.reference.close();
    }
}
