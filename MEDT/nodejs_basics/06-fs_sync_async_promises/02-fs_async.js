import {readFile} from 'node:fs';

console.log('A')
readFile('./input.txt', 'utf8', (err, data) => {
    if (err !== null) {
        console.error((err.message));
    } else {
        console.log('B')
        console.log(data)
    }

});

console.log('C')