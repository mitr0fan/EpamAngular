import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from 'src/app/course';
import { CoursesService } from 'src/app/courses.service';
import { DurationPipe } from 'src/app/directives-pipes/duration.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthorsService } from 'src/app/authors.service';
import { Author } from 'src/app/user';

@Component({
    selector: 'app-edit-course',
    templateUrl: './edit-course.component.html',
    styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    private id: number;
    public authors: Author[] = [];
    public authorsFromServer$: Observable<Author[]>;

    public courseForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.maxLength(40)]),
        description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
        date: new FormControl(null, [Validators.required]),
        duration: new FormControl(null, [Validators.required]),
        authors: new FormControl('', [Validators.required]),
    });

    constructor(
        private coursesService: CoursesService,
        private durationPipe: DurationPipe,
        private route: ActivatedRoute,
        private router: Router,
        private datePipe: DatePipe,
        private authorsService: AuthorsService
    ) {}

    ngOnInit() {
        this.subscription = this.route.params
            .pipe(
                switchMap((data) => {
                    if (data.id) {
                        return this.coursesService.getItemById(data.id).pipe(
                            tap((course) => {
                                const fetchedCourse = course[0];
                                if (fetchedCourse) {
                                    this.courseForm.setValue({
                                        title: fetchedCourse.title,
                                        description: fetchedCourse.description,
                                        date: this.datePipe.transform(fetchedCourse.date, 'dd.MM.yyyy'),
                                        duration: fetchedCourse.duration,
                                        authors: '',
                                    });
                                    this.id = fetchedCourse.id;
                                    this.authors = fetchedCourse.authors;
                                } else {
                                    this.router.navigate(['/error']);
                                }
                            })
                        );
                    } else {
                        return [];
                    }
                })
            )
            .subscribe();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    close() {
        this.router.navigate(['/courses']);
    }

    edit() {
        // const newCourse: Course = {
        //     id: this.course.id,
        //     title: titleContent,
        //     date: this.coursesService.dateFromStringToMs(dateContent),
        //     duration: this.durationPipe.changeDurationFromMinutesToMs(durationContent),
        //     description: descriptionContent,
        //     topRated: this.course.topRated,
        // };

        // if (!this.course.id) {
        //     this.coursesService.createCourse(newCourse).subscribe(() => {
        //         this.router.navigate(['/courses']);
        //     });
        // } else {
        //     this.coursesService.updateItem(newCourse).subscribe(() => {
        //         this.router.navigate(['/courses']);
        //     });
        // }
        console.log(this.courseForm);
        if (this.courseForm.valid) {
            console.log('edit called');
        }
    }

    search(value: string) {
        this.authorsFromServer$ = this.authorsService.getAuthorsList(value);
    }
}
