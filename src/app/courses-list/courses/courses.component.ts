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

  public courses: Course[];
  public inputSearch = '';

  ngOnInit() {
    this.courses = this.coursesService.getCourses();
  }

  loadMoreCourses() {
    console.log('Handler for "Load More" button');
  }

  deleteCourse(id: number) {
    console.log(`Delete course with id: ${id}`);
  }

  search(value: string) {
    this.inputSearch = value;
  }

}
