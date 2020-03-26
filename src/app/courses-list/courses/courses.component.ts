import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { Course } from 'src/app/course';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCoursePopupComponent } from '../delete-course-popup/delete-course-popup.component';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { GetCourses } from 'src/store/actions/courses.actions';
import { Subscription, Observable } from 'rxjs';
import { selectCoursesState } from 'src/store/selectors/courses.selector';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
    constructor(
        private coursesService: CoursesService,
        private dialog: MatDialog,
        private router: Router,
        private store: Store
    ) {}

    public courses$: Observable<Course[]>;
    private amountCourses = 2;

    ngOnInit() {
        this.store.dispatch(
            new GetCourses({
                amountCourses: this.amountCourses,
                amountPages: 1,
            })
        );

        this.courses$ = this.store.pipe(select(selectCoursesState));
    }

    ngOnDestroy() {
        this.dialog.ngOnDestroy();
    }

    loadMoreCourses() {
        // this.amountCourses += 2;
        // this.coursesService
        //     .getList(this.amountCourses, 1)
        //     .subscribe((courses) => (this.courses = courses));
    }

    deleteCourse(id: number) {
        // const dialogRef = this.dialog.open(DeleteCoursePopupComponent, {
        //     data: { idCourse: id },
        // });
        // dialogRef
        //     .afterClosed()
        //     .pipe(
        //         switchMap(() => this.coursesService.getList(this.amountCourses, 1)),
        //         tap((courses) => (this.courses = courses))
        //     )
        //     .subscribe();
    }

    search(value: string) {
        // this.coursesService
        //     .searchCoursesByTitle(value)
        //     .pipe(
        //         switchMap((coursesTitle) => {
        //             return this.coursesService.searchCoursesByDescription(value).pipe(
        //                 tap((courses) => {
        //                     this.courses = coursesTitle.length
        //                         ? this.coursesService.deleteSameCourses(coursesTitle, courses)
        //                         : courses;
        //                 })
        //             );
        //         })
        //     )
        //     .subscribe();
    }

    createNewCourse() {
        this.router.navigate(['courses/new']);
    }

    editCourse(id: number) {
        this.router.navigate(['courses/', id]);
    }
}
