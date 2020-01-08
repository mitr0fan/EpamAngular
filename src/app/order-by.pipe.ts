import { Pipe, PipeTransform } from '@angular/core';
import { Course } from './course';

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
    transform(value: Course[], ...args: any[]): Course[] {
        console.log(value);
        return value.sort((a, b) => {
            if (a.date > b.date) {
                return 1;
            } else if (a.date === b.date) {
                return 0;
            } else {
                return -1;
            }
        });
    }
}
