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

  ngOnInit() {
    console.log('ngOnInit() was called');
  }

}
