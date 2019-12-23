import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/course';
import { CoursesService } from 'src/app/courses.service';
import { DurationPipe } from 'src/app/duration.pipe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-edit-course',
    templateUrl: './edit-course.component.html',
    styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent implements OnInit {
    public course: Course;
    private emptyCourse: Course = {
        id: 0,
        title: '',
        date: '',
        duration: 0,
        description: '',
        topRated: false,
    };

    constructor(
        private coursesService: CoursesService,
        private durationPipe: DurationPipe,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params.subscribe((data) => {
            if (data.id) {
                const index = +this.coursesService.getItemById(+data.id);
                if (index !== -1) {
                    this.course = this.coursesService.getList()[index];
                } else {
                    this.course = this.emptyCourse;
                    this.router.navigate(['/error']);
                }
            } else {
                this.course = this.emptyCourse;
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
            date: dateContent,
            duration: this.durationPipe.changeDurationFromMinutesToMs(durationContent),
            description: descriptionContent,
            topRated: this.course.topRated,
        };
        this.coursesService.createCourse(newCourse);

        this.router.navigate(['/courses']);
    }
}
