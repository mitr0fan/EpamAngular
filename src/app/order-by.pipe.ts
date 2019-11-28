import { Pipe, PipeTransform } from '@angular/core';
import { Course } from './course';

@Pipe({
    name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
    transform(value: Course[], ...args: any[]): Course[] {
        return value.sort((a, b) => {
            let date1 = `${a.date.toString().slice(3, 5)}.
            ${a.date.toString().slice(0, 2)}.
            ${a.date.toString().slice(6)}`;

            let date2 = `${b.date.toString().slice(3, 5)}.
            ${b.date.toString().slice(0, 2)}.
            ${b.date.toString().slice(6)}`;

            date1 = new Date(date1).getTime() + '';
            date2 = new Date(date2).getTime() + '';

            if (date1 > date2) {
                return 1;
            } else if (date1 === date2) {
                return 0;
            } else {
                return -1;
            }
        });
    }
}
