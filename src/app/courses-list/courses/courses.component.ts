import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/courses.service';
import { Course } from 'src/app/course';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCoursePopupComponent } from 'src/app/courses-list/delete-course-popup/delete-course-popup.component';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
    constructor(private coursesService: CoursesService, private dialog: MatDialog) {}

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
        this.coursesService.createCourse();
        this.courses = this.coursesService.getList();
    }

    update() {
        this.coursesService.updateItem();
    }
}
