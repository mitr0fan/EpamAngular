import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'duration',
})
export class DurationPipe implements PipeTransform {
    transform(duration: number, ...args: any[]): any {
        const hour = 1000 * 60 * 60;
        const oneMinute = 1000 * 60;

        if (duration <= hour) {
            return duration / oneMinute + 'min';
        } else {
            const hours = Math.floor(duration / hour);
            const minutes = (duration - hours * hour) / oneMinute;

            return `${hours}h ${minutes}min`;
        }
    }
}
