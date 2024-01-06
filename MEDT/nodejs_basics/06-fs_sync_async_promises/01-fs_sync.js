import {readFileSync} from 'node:fs';

const fileContent = readFileSync('C:/Schule/Schuljahr202324/medt/nodejs_basics/06-fs_sync_async_promises/input.txt');

console.log(fileContent) = readFileSync('C:/Schule/Schuljahr202324/medt/nodejs_basics/06-fs_sync_async_promises/input.txt', 'utf-8');

console.log('B');

console.log(fileContent);

console.log('C');