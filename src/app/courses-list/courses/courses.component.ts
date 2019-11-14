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

  public courses: Course[] = this.coursesService.getCourses();

  mathFloor = Math.floor;

  ngOnInit() {
  }

}
