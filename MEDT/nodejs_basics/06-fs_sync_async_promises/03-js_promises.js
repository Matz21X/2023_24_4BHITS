import {readFile} from 'node:fs/promises';

/*
// Variante 1

const promise = readFile('.input.txt', 'utf-8');
console.log(promise);

promise.then((data) => console.log(data));
promise.catch((error) => console.error(error.message));

// Variante 2
readFile('./input.txt', 'utf-8').then(
    (data) => console.log(data),
    (error)=> console.error(error.message) 
); 
*/

console.log('A')
try{
const data = await readFile('./input.txt', 'utf8');

console.log('B');
console.log(data);
}catch (error){
    console.error(error.message);
}

console.log('C');