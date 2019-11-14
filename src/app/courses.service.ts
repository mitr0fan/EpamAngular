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
    return data;
  }

}
