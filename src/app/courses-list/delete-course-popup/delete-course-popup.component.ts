import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoursesService } from 'src/app/services/courses.service';
import { Store, select } from '@ngrx/store';
import { RemoveCourse } from 'src/store/actions/courses.actions';
import { selectAmountCourses } from 'src/store/selectors/courses.selector';

@Component({
    selector: 'app-delete-course-popup',
    templateUrl: './delete-course-popup.component.html',
    styleUrls: ['./delete-course-popup.component.scss'],
})
export class DeleteCoursePopupComponent implements OnInit {
    amountCourses: number;

    constructor(
        private reference: MatDialogRef<DeleteCoursePopupComponent>,
        private courseService: CoursesService,
        @Inject(MAT_DIALOG_DATA) private id: any,
        private store: Store
    ) {}

    ngOnInit() {
        this.store
            .pipe(select(selectAmountCourses))
            .subscribe((value) => (this.amountCourses = value));
    }

    closePopup() {
        this.reference.close();
    }

    removeCourse() {
        this.store.dispatch(
            new RemoveCourse({
                id: this.id.idCourse,
                amountCourses: this.amountCourses,
            })
        );
        this.reference.close();
    }
}
