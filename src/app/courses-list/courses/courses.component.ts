import { Component, OnInit, Input } from '@angular/core';
import { CoursesService } from 'src/app/courses.service';
import { Course } from 'src/app/course';
import { format } from 'date-fns';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  @Input() courses: Course[];

  constructor( private coursesService: CoursesService ) { }

  //public courses: Course[] = this.coursesService.getCourses();

  mathFloor = Math.floor;

  ngOnInit() {
  }

}
