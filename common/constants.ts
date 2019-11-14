import { Course } from 'src/app/course';
import { format } from 'date-fns';

export const data: Course[] = [];

const time = 1573643183134;
const changes = 100000000000;
const minutes = 200;

for ( let i = 1; i < 5; i++ ) {
    data.push({
        id: i,
        title: 'How to do something',
        date: time - (+(Math.random()).toFixed(1)) * changes,
        duration: Math.ceil(Math.random() * minutes) * 60, // time in seconds
        description: 'The best course EVER!!!'
    });
}
/*
data.map((i) => {
    i.date = format(new Date(i.date), 'dd-MM-yyyy HH:mm:ss');
});
*/
