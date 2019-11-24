import { Pipe, PipeTransform } from '@angular/core';
import { Course } from './course';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Course[], name: string): Course[] {
    // console.log( value.filter((course) => {
    //   if (course.title.toLowerCase().includes(name.toLowerCase())) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }) );
    return value.filter((course) => {
      if (course.title.toLowerCase().includes(name.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
  }

}
