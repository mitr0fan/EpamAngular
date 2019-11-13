import { Injectable } from '@angular/core';
import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() {
    for ( let i = 1; i < 5; i++ ) {
      this.data.push({
        id: i,
        title: 'How to do something',
        date: 1573643183134 - Math.random() * 100000000000,
        // date: `${day.getDate()}.${day.getMonth() + 1}.${day.getFullYear()}`,
        duration: Math.ceil(Math.random() * 200) * 60, // time in seconds
        description: 'The best course EVER!!!'
    });
    }
   }

  data: Course[] = [];

}
