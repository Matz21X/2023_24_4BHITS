const fs = require('node:fs/promises');
async function example() {
    try {
        const data = await fs.readFile('/Users/joe/test.txt', { encoding: 'utf8' });
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}
example();