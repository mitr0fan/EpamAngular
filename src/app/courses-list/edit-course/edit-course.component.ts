import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/course';
import { CoursesService } from 'src/app/courses.service';
import { DurationPipe } from 'src/app/duration.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from 'src/app/authorization.service';

@Component({
    selector: 'app-edit-course',
    templateUrl: './edit-course.component.html',
    styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent implements OnInit {
    private emptyCourse: Course = {
        id: undefined,
        title: '',
        date: '',
        duration: 0,
        description: '',
        topRated: false,
    };
    public course: Course = this.emptyCourse;

    constructor(
        private coursesService: CoursesService,
        private durationPipe: DurationPipe,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params.subscribe((data) => {
            if (data.id) {
                this.coursesService.getItemById(data.id).subscribe((course) => {
                    if (course[0]) {
                        this.course = course[0];
                    } else {
                        this.router.navigate(['/error']);
                    }
                });
            }
        });
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
                setTimeout(() => {
                    this.router.navigate(['/courses']);
                }, 100);
            });
        } else {
            this.coursesService.updateItem(newCourse).subscribe(() => {
                setTimeout(() => {
                    this.router.navigate(['/courses']);
                }, 100);
            });
        }
    }
}
