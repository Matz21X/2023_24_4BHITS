In JavaScript werden "import" und "export" verwendet, um Code zwischen Dateien aufzuteilen und zu teilen. Mit "export" markierst du, was du in einer Datei freigeben möchtest, und mit "import" kannst du auf diese freigegebenen Teile in einer anderen Datei zugreifen. "export" sagt, was exportiert wird, und "import" sagt, was importiert wird.

Beispiel:

**mathFunctions.js** :

export function add(a, b) {

return a + b;

}

export const pi = 3.14159265;

**main.js** :

import { add, pi } from './mathFunctions';

console.log(add(2, 3)); // Ausgabe: 5

console.log(pi); // Ausgabe: 3.14159265

Arrow-Funktionen in JavaScript sind eine kompakte Möglichkeit, Funktionen zu definieren. Sie haben eine kürzere Syntax und erben das „this" des umgebenden Kontexts. Hier ist ein einfaches Beispiel:

// Herkömmliche Funktion zur Addition

function add(a, b) {

return a + b;

}

// Arrow-Funktion zur Addition

const addArrow = (a, b) => a + b;