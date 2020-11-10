import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { DurationPipe } from 'src/app/directives-pipes/duration.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthorsService } from 'src/app/services/authors.service';
import { Author } from 'src/app/user';
import { Store, select } from '@ngrx/store';
import { GetCourseData, GetCourseDataSuccess } from 'src/store/actions/courses.actions';
import { Course } from 'src/app/course';
import { selectCourseData } from 'src/store/selectors/courses.selector';

@Component({
    selector: 'app-edit-course',
    templateUrl: './edit-course.component.html',
    styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent implements OnInit, OnDestroy {
    private subscription = new Subscription();
    private id: number;
    public authors: Author[] = [];
    public authorsFromServer$: Observable<Author[]>;

    public courseForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.maxLength(40)]),
        description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
        date: new FormControl(null, [Validators.required]),
        duration: new FormControl(null, [Validators.required]),
        authors: new FormControl(''),
        topRated: new FormControl(false),
        id: new FormControl(''),
    });

    constructor(
        private coursesService: CoursesService,
        private durationPipe: DurationPipe,
        private route: ActivatedRoute,
        private router: Router,
        private datePipe: DatePipe,
        private authorsService: AuthorsService,
        private store: Store
    ) {}

    ngOnInit() {
        const sub1 = this.route.params.subscribe((data) => {
            if (data.id) {
                const id = +data.id;
                this.store.dispatch(new GetCourseData({ id }));
            }
        });

        const sub2 = this.store.pipe(select(selectCourseData)).subscribe((course) => {
            if (course) {
                this.courseForm.patchValue({
                    title: course.title,
                    description: course.description,
                    date: this.datePipe.transform(course.date, 'dd.MM.yyyy'),
                    duration: course.duration,
                    authors: '',
                    topRated: course.topRated,
                    id: course.id,
                });
                this.id = course.id;
                this.authors = course.authors || [];
            }
        });

        this.subscription.add(sub1);
        this.subscription.add(sub2);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.store.dispatch(new GetCourseDataSuccess({ course: null }));
    }

    close() {
        this.router.navigate(['/courses']);
    }

    edit() {
        if (this.courseForm.valid) {
            this.courseForm.value.date = this.coursesService.dateFromStringToMs(
                this.courseForm.value.date
            );
            this.courseForm.value.duration = this.durationPipe.changeDurationFromMinutesToMs(
                this.courseForm.value.duration
            );
            this.courseForm.value.authors = this.authors;

            if (!this.id) {
                this.coursesService.createCourse(this.courseForm.value).subscribe(() => {
                    this.router.navigate(['/courses']);
                });
            } else {
                this.coursesService.updateItem(this.courseForm.value).subscribe(() => {
                    this.router.navigate(['/courses']);
                });
            }
        }
    }

    search(value: string) {
        this.authorsFromServer$ = this.authorsService.getAuthorsList(value);
    }

    changeAuthors(authors: Author[]) {
        this.authors = authors;
    }
}
