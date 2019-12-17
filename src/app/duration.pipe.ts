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

    changeDurationFromMinutesToMs(duration: string | number) {
        const msInMinute = 60 * 1000;
        const msInHour = 60 * 60 * 1000;

        if (('' + duration).includes('min')) {
            if (('' + duration).includes('h')) {
                return duration[0] * msInHour + +('' + duration).slice(3, -3) * msInMinute;
            } else {
                return +('' + duration).slice(0, -3) * msInMinute;
            }
        } else {
            return +(duration) * msInMinute;
        }
    }
}
