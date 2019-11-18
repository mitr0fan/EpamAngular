import { Component, OnInit } from '@angular/core';
import { CoursesService } from './courses.service';
import { Course } from 'src/app/course';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor( private coursesService: CoursesService ) {
  }

  title = 'MyProject';

  public unchengedCourses: Course[] = this.coursesService.getCourses();

  public courses: Course[];

  ngOnInit() {
    this.courses = this.unchengedCourses;
  }

  search(courseName: string) {
    courseName = courseName.toLowerCase();
    this.courses = [];

    if (courseName.length > 0) {
      this.unchengedCourses.forEach((course) => {
        const name: string = course.title.slice(0, courseName.length);
        if (name.toLowerCase() === courseName) {
          this.courses.push(course);
        }
      });
    } else {
      this.courses = this.unchengedCourses;
    }
  }

}
