import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from 'src/app/course';
import { CoursesService } from 'src/app/courses.service';
import { DurationPipe } from 'src/app/duration.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-edit-course',
    templateUrl: './edit-course.component.html',
    styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent implements OnInit, OnDestroy {
    private subscription: Subscription;

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
        private router: Router
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
                                        date: fetchedCourse.date,
                                        duration: fetchedCourse.duration,
                                        authors: '',
                                    });
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

            this.courseForm.valueChanges.subscribe(v => {
                console.log(v);
            })
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
        if (this.courseForm.valid) {
            console.log('edit called');
        }
    }
}
