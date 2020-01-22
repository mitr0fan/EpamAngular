import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from 'src/app/course';
import { CoursesService } from 'src/app/courses.service';
import { DurationPipe } from 'src/app/duration.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-edit-course',
    templateUrl: './edit-course.component.html',
    styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent implements OnInit, OnDestroy {
    private emptyCourse: Course = {
        id: undefined,
        title: '',
        date: '',
        duration: 0,
        description: '',
        topRated: false,
    };
    public course: Course = this.emptyCourse;
    private subscription: Subscription;

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
                                if (course[0]) {
                                    this.course = course[0];
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

    edit(
        titleContent: string,
        dateContent: string,
        durationContent: any,
        descriptionContent: string
    ) {
        const newCourse: Course = {
            id: this.course.id,
            title: titleContent,
            date: this.coursesService.dateFromStringToMs(dateContent),
            duration: this.durationPipe.changeDurationFromMinutesToMs(durationContent),
            description: descriptionContent,
            topRated: this.course.topRated,
        };

        if (!this.course.id) {
            this.coursesService.createCourse(newCourse).subscribe(() => {
                this.router.navigate(['/courses']);
            });
        } else {
            this.coursesService.updateItem(newCourse).subscribe(() => {
                this.router.navigate(['/courses']);
            });
        }
    }
}
