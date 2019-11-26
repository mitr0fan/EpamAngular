import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'duration',
})
export class DurationPipe implements PipeTransform {
    transform(value: number, ...args: any[]): any {
        const hour = 1000 * 60 * 60; // кол-во мс в 60 минутах

        if (value <= hour) {
            return value / 1000 / 60 + 'min';
        } else {
            const hours = Math.floor(value / hour);
            const minutes = (value - hours * hour) / 1000 / 60;

            return `${hours}h ${minutes}min`;
        }
    }
}
