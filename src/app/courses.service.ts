import { Injectable } from '@angular/core';
import { Course } from './course';
import { data } from '../../common/constants';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() {
  }

  getCourses(): Course[] {
    const courses: Course[] = [];

    data.forEach((i) => {
      i.date = format(new Date(i.date), 'dd-MM-yyyy HH:mm:ss');
      courses.push(i);
    });

    return courses;
  }

}
