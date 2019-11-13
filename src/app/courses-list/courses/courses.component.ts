import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/courses.service';
import { Course } from 'src/app/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor( private getCourses: CoursesService ) { }

  courses: Course[] = this.getCourses.data;

  func = Math.floor;

  ngOnInit() {
  }

}
