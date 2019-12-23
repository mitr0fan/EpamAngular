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

    public courses: Course[];
    public inputSearch = '';

    ngOnInit() {
        this.courses = this.coursesService.getList();
    }

    loadMoreCourses() {
        console.log('Handler for "Load More" button');
    }

    deleteCourse(id: number) {
        const dialogRef = this.dialog.open(DeleteCoursePopupComponent, {
            height: '120px',
            data: { idCourse: id },
        });

        const removeCoursePromise: Promise<any> = dialogRef.afterClosed().toPromise();
        removeCoursePromise.then(() => (this.courses = this.coursesService.getList()));
    }

    search(value: string) {
        this.inputSearch = value;
    }

    createNewCourse() {
        this.router.navigate(['courses/new']);
    }

    editCourse(id: number) {
        this.router.navigate(['courses/', id]);
    }
}
