import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'duration',
})
export class DurationPipe implements PipeTransform {
    transform(duration: number, ...args: any[]): any {
        const hour = 1000 * 60 * 60; // ms in 60 minutes
        const oneMinute = 1000 * 60; // ms in one minute

        if (duration <= hour) {
            return duration / oneMinute + 'min';
        } else {
            const hours = Math.floor(duration / hour);
            const minutes = (duration - hours * hour) / oneMinute;

            return `${hours}h ${minutes}min`;
        }
    }
}
