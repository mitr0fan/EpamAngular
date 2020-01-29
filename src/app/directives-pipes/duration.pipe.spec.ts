import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
    it('create an instance', () => {
        const pipe = new DurationPipe();
        expect(pipe).toBeTruthy();
    });

    it('return minutes', () => {
        const pipe = new DurationPipe();
        const halfHour = 1000 * 60 * 30;
        expect(pipe.transform(halfHour)).toEqual('30min');
    });

    it('return minutes', () => {
        const pipe = new DurationPipe();
        const twoHoursThirtyMinutes = 1000 * 60 * 150;
        expect(pipe.transform(twoHoursThirtyMinutes)).toEqual('2h 30min');
    });
});
