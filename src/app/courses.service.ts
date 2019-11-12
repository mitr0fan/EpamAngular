import { Injectable } from '@angular/core';
import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() {
    const day = new Date();

    for ( let i = 1; i < 6; i++ ) {
      this.data.push({
        id: i,
        title: 'How to do something',
        date: `${day.getDate()}.${day.getMonth() + 1}.${day.getFullYear()}`,
        duration: Math.ceil(Math.random() * 60),
        description: 'The best course EVER!!!'
    });
    }
   }

  data: Course[] = [];

}
