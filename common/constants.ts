export const data = [];
const time = 1573643183134;
const changes = 100000000000;
const minutes = 200;
for ( let i = 1; i < 5; i++ ) {
    data.push({
        id: i,
        title: 'How to do something',
        date: time - Math.random() * changes,
        duration: Math.ceil(Math.random() * minutes) * 60, // time in seconds
        description: 'The best course EVER!!!'
    });
}
