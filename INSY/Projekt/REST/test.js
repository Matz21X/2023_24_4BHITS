const fs = require('node:fs');

const bruh = fs.readFile('./oasch.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
});

console.log(bruh)