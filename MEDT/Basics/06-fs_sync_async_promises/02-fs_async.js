import {readFile} from 'node:fs';

console.log('A')

readFile('./input.txt', 'utf8', (error, data) => {
   if (error !== null) {
       console.error(error.message);
   } else {
       console.log('B')
       console.log(data);
   }
});

console.log('C')