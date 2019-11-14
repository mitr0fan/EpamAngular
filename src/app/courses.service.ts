import { Injectable } from '@angular/core';
import { Course } from './course';
import { data } from '../../common/constants';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() {
  }

  getCourses() {
    return data;
  }

}
