// Bei sync wartet der Code bis das File geladen ist (ungut 😬)
import {readFileSync} from 'node:fs';  // Importiert Filesystem Modul

const fileContent = readFileSync('./oasch.txt', 'utf8');

console.log(fileContent);  