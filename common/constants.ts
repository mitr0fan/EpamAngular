import { Course } from 'src/app/course';

export const data: Course[] = [];

const time = new Date().getTime();
const changes = 2000000000;
const minutes = 200;

for ( let i = 1; i < 6; i++ ) {
    const randomSign = Math.random();
    let top;

    // number from 0 to 1, allow regulate amount of courses dates in past and in future
    const regulatorDates = 0.3;

    if (i % 2 > 0) {
        top = false;
    } else {
        top = true;
    }

    if (randomSign > regulatorDates) {
        data.push({
            id: i,
            title: `Video course ${i}`,
            date: time - (Math.ceil(Math.random() * 10) / 10) * changes,
            duration: Math.ceil(Math.random() * minutes) * 60 * 1000, // time in ms
            description: 'The best course EVER!!!',
            topRated: top,
        });
    } else {
        data.push({
            id: i,
            title: `Video course ${i}`,
            date: time + (Math.ceil(Math.random() * 10) / 10) * changes,
            duration: Math.ceil(Math.random() * minutes) * 60 * 1000, // time in ms
            description: 'The best course EVER!!!',
            topRated: top,
        });
    }
}

