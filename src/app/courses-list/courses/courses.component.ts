import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from 'src/app/course';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCoursePopupComponent } from '../delete-course-popup/delete-course-popup.component';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { GetCourses, ChangeAmountCourses, SearchCourses } from 'src/store/actions/courses.actions';
import { Subscription, Observable, merge, concat, forkJoin, zip } from 'rxjs';
import { selectCoursesState, selectAmountCourses } from 'src/store/selectors/courses.selector';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
    constructor(
        private dialog: MatDialog,
        private router: Router,
        private store: Store
    ) {}

    public courses$: Observable<Course[]>;
    private amountCourses: number;

    ngOnInit() {
        this.store.pipe(select(selectAmountCourses))
            .subscribe(value => this.amountCourses = value);

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
        this.store.dispatch(new ChangeAmountCourses({amount: this.amountCourses += 2}));

        this.store.dispatch(
            new GetCourses({
                amountCourses: this.amountCourses,
                amountPages: 1,
            })
        );
    }

    deleteCourse(id: number) {
        this.dialog.open(DeleteCoursePopupComponent, {
            data: { idCourse: id },
        });
    }

    search(value: string) {
        this.store.dispatch(new SearchCourses({value}));
    }

    createNewCourse() {
        this.router.navigate(['courses/new']);
    }

    editCourse(id: number) {
        this.router.navigate(['courses/', id]);
    }
}
