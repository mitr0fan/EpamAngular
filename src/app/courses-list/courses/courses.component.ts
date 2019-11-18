import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/courses.service';
import { Course } from 'src/app/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor( private coursesService: CoursesService ) { }

  courses: Course[] = this.coursesService.getCourses();

  public mathFloor = Math.floor;

  ngOnInit() {
  }

  loadMoreCourses() {
    console.log('Handler for "Load More" button');
  }

  deleteCourse(id: number) {
    console.log(`Delete course with id: ${id}`);
  }

}
