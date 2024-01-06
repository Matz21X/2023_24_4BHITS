# Testvorbereitung 
#MEDT #HOEF

**Stoff:**
1. Javascript - Basics, kurze Codebeispiele (ähnlich wie beim Quiz)
2. NodeJs - Was ist das?, Aufbau, Features, Installationsvarianten, Features für Hot/Cold Reloading, Modulsysteme, Codebeispiele z.B. mit Express, Sync, Async, Promises,...
3. REST
4. API-Design
5. OpenAPI - Definition, Wozu dient es?, Endpunkte auf Basis eine Specification identifizieren... keine Specification selbst schreiben notwendig
6. Docker - Definition, Einsatz, Vorteile/Nachteile, Setup, DockerCommands (z.B. Container auflisten, starten, stoppen, Images auflisten, downloaden, ......... , es ist nicht notwendig Images builden zukönnen)


### Basics

**Variablen**
```js
var // Function scope
let // Block scope (standard)
const // Konstante
```

**Strings**
```js
// Formatierter String mit `` (Einzeiliger String mit "")
const address = `Eduard Müller  
Anton Ehrenfried-Straße 10  
2020 Hollabrunn`;

// Interpolation (innerhalb der Klammer ${ } kann js code stehen)
const address2 = `${firstName} ${lastname}  
${street} ${houseNr}  
${zipCode} ${city}`;  
  
console.log(address2);
```

**Inline functions**
```js
const ListDoubled = list.map(function ( number){  
    const result = number * 2;  
    return result;  
});  
  
console.log(ListDoubled);
```

**Arrow functions**
```js
const ListDoubled = list.map((x) => x*2);  
  
console.log(ListDoubled);
```

**Objektzugriff**
```js
// Objekt  
const address = {  
    firstName: 'Eduard',  
    lastName: 'Müller',  
    ... // Weitere Eigenschaften
};  
  
console.log(address);  
console.log(address.firstName);
```

**Filehandling (sync)**
```js
// Bei sync wartet der Code bis das File geladen ist (ungut 😬)
import {readFileSync} from 'node:fs';  // Importiert Filesystem Modul

const fileContent = readFileSync('./input.txt', 'utf8');  
  
console.log(fileContent);  
```

**Filehandling (async)**
```js
// Bei async wartet der Code nicht und macht normal weiter bis die Ressource geladen ist (😎)
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

// ------------ LOG ------------
A
C
B
This is my Filecontent
```

**Promises**
```js
import {readFile} from 'node:fs/promises';

console.log('A')  
try {  
    const data = await readFile('./input.txt', 'utf8');  
  
    console.log('B');  
    console.log(data);  
} catch (error) {  
    console.error(error.message);  
}  
  
console.log('C');
```

**Klassen:**
```js
// # Steht für private
class Person {  
    #firstName;  
    #lastName;  
  
    constructor(firstName, lastName) {  
        this.#firstName = firstName;  
        this.#lastName = lastName;  
    }  
  
    getFullName() {  

        return `${this.#firstName} ${this.#lastName}`  
    }  
}  
  
const p = new Person('Eduard','Müller');  
  
console.log(person);  
console.log(p.getFullName());

// ------------ LOG ------------
Eduard Müller
{
  firstName: 'Eduard',
  lastName: 'Müller',
  getFullName: [Function: getFullName]
}
Eduard Müller
```

### NodeJS Theorie

>[!INFO] Was ist NodeJS?
>Node.js ist eine <span style="color:#00b050">Open-Source-Plattform</span>, die es ermöglicht, serverseitige Anwendungen mit JavaScript zu entwickeln.
>Ein Hauptmerkmal von Node.js ist die <span style="color:#00b050">V8 JavaScript-Engine von Google</span>, die eine hohe Leistung und Geschwindigkeit bietet. Node.js eignet sich besonders gut für Anwendungen, die viele gleichzeitige Verbindungen handhaben müssen, wie beispielsweise Webanwendungen, APIs (Application Programming Interfaces) oder Echtzeit-Anwendungen wie Chat-Anwendungen.

**Aufbau**
```
(Javascript)
+-------------------------+          +-------------------------+
|       User Code         |          |           NPM           |
+-------------------------+          +-------------------------+
+--------------------------------------------------------------+
|                      Node Standard Library                   |
+--------------------------------------------------------------+
```

**Features**
- Scalability
- NPM (Node Package Manager)
- Asynchron
- Lightweight

**In**
