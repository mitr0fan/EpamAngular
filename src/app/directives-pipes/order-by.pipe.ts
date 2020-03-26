import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../course';

@Pipe({
    name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
    transform(value: Course[], ...args: any[]): Course[] {
        const arr = [...value];
        return arr.sort((a, b) => (a.date > b.date ? 1 : -1));
    }
}
