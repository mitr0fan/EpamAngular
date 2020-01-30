import { Pipe, PipeTransform } from '@angular/core';
import { differenceInMinutes } from 'date-fns';
import { differenceInMilliseconds } from 'date-fns';

@Pipe({
    name: 'duration',
})
export class DurationPipe implements PipeTransform {
    private msInHour = 1000 * 60 * 60;
    private msInMinute = 1000 * 60;
    transform(duration: string, ...args: any[]): any {
        if (duration === 'NaN') {
            duration = '0';
            return duration + 'min';
        }
        if (+duration < this.msInMinute) {
            duration = +duration * this.msInMinute + '';
        }
        if (+duration <= this.msInHour) {
            return +duration / this.msInMinute + 'min';
        } else {
            const hours = Math.floor(+duration / this.msInHour);
            const minutes = (+duration - hours * this.msInHour) / this.msInMinute;

            return `${hours}h ${minutes}min`;
        }
    }

    changeDurationFromMsToMinutes(duration: number): string {
        return `${differenceInMinutes(duration, 0)}`;
    }

    changeDurationFromMinutesToMs(duration: number) {
        return `${differenceInMilliseconds(duration, 0)}`;
    }
}
