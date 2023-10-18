import {readFile} from 'mode:fs/promises';

// Variante 1

const promise = readFile('./input.txt', 'utf8');
console.log(promise)
promise.then((data) => console.log(data))
promise.catch((error) => console.error(error.message))

// VAriante 2
readFile('./input.txt', 'utf8').then(
    (data) => console.log(data),
    (error) => console.error(error.message)
)

// Variante 3
try {
    const data = await readFile('./input.txt', 'utf8');
    console.log(data)
}catch (error)    {
    console.error(error.message);
}

