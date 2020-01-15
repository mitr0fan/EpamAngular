import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/courses.service';
import { Course } from 'src/app/course';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCoursePopupComponent } from '../delete-course-popup/delete-course-popup.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
    constructor(
        private coursesService: CoursesService,
        private dialog: MatDialog,
        private router: Router
    ) {}

    public courses: Course[] = [];
    private amountCourses = 2;

    ngOnInit() {
        this.coursesService.getList(this.amountCourses, 1).subscribe((courses) => {
            this.courses = courses;
        });
    }

    loadMoreCourses() {
        this.amountCourses += 2;
        this.coursesService
            .getList(this.amountCourses, 1)
            .subscribe((courses) => (this.courses = courses));
    }

    deleteCourse(id: number) {
        const dialogRef = this.dialog.open(DeleteCoursePopupComponent, {
            height: '120px',
            data: { idCourse: id },
        });

        dialogRef
            .afterClosed()
            .subscribe(() =>
                this.coursesService
                    .getList(this.amountCourses, 1)
                    .subscribe((courses) => (this.courses = courses))
            );
    }

    search(value: string) {
        this.coursesService.searchCoursesByTitle(value).subscribe((coursesTitle) => {
            if (coursesTitle.length > 0) {
                this.coursesService
                    .searchCoursesByDescription(value)
                    .subscribe((coursesDescription) => {
                        this.courses = this.coursesService.deleteSameCourses(
                            coursesTitle,
                            coursesDescription
                        );
                    });
            } else {
                this.coursesService
                    .searchCoursesByDescription(value)
                    .subscribe((courses) => (this.courses = courses));
            }
        });
    }

    createNewCourse() {
        this.router.navigate(['courses/new']);
    }

    editCourse(id: number) {
        this.router.navigate(['courses/', id]);
    }
}
