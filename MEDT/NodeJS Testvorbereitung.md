# Testvorbereitung 
#MEDT #HOEF

**Stoff:**
1. Javascript - Basics, kurze Codebeispiele (ähnlich wie beim Quiz)
2. NodeJS - Was ist das?, Aufbau, Features, Installationsvarianten, Features für Hot/Cold Reloading, Modulsysteme, Codebeispiele z.B. mit Express, Sync, Async, Promises,...
3. REST
4. API-Design
5. OpenAPI - Definition, Wozu dient es?, Endpunkte auf Basis einer Specification identifizieren... keine Specification selbst schreiben notwendig
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
const ListDoubled = list.map(function (number){  
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
const fs = require('node:fs');  
try {  
    const data = fs.readFileSync('/Users/joe/test.txt', 'utf8');  
    console.log(data);  
} catch (err) {  
    console.error(err);  
}
```

**Filehandling (async)**
```js
const fs = require('node:fs');  
fs.readFile('/Users/joe/test.txt', 'utf8', (err, data) => {  
    if (err) {  
        console.error(err);  
        return;  
    }  
    console.log(data);  
});
```

**Promises**
```js
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
>**Javascript Laufzeitumgebung**
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

**Installationsvarianten**
Installation über nvm (Node Version Manager)
```shell
nvm install lastest // Installiert neueste NodeJS Version
nvm install lts // Long time support
nvm install x.x.x
...

nvm use x.x.x // Benutzt angegebene Version
nvm list 
nvm current
```
NPM (Node Package Manager)
```
npm install <modul/package> (-g) (-g steht für Global - installiert modul bei jeder Node Version)
npm init // Erstellt package in aktuellem Verzeichnis
```

**Hot / Cold Reloading**
<span style="color:#00b0f0">Cold Reloading:</span>
Bei Cold Reloading wird der Prozess manuell komplett (oder große Teile) gestoppt und neu gestartet, um die Veränderungen durch den neu geschriebenen Code zu sehen. Dies ist mühsam.

<span style="color:#ff0000">Hot Reloading:</span>
Im Gegensatz zu Cold Reloading bietet Hot Reloading automatische Aktualisierung in Echtzeit. Die Entwickler können nun besser arbeiten dar sie die Auswirkungen ihres Codes direkt sehen.

Tools für Hot Reloading:
`nodemon index.js`

**Modulsysteme (CommonJS/ ECMAScript)**
<span style="color:#00b050">CommonJS</span>
- Ursprüngliches Modulsystem für NodeJS
```js
// index.js
require(`./user`);

// user.js
class User {...}
module.exports = User;
```

<span style="color:#00b050">ECMAScript</span>
- Dateityp -> `.mjs`
- package.json -> `type: module`
- Commandline Argument -> `node -input-type=module`
```js
// Exportieren
// NAMED
export class User {...}
// DEFAULT
export default class User {...}
export default bruhFunc;
export const bruh = x => {
...
}

// Importieren
// NAMED
import { User } from `./user.mjs`
import { User as CustomName } from `./user.mjs`

// DEFAULT
import User from `./user.mjs`
import CustomName from `./user.mjs`
```

### REST

>[!SUMMARY] REST
> **R**epresentational **S**tate **T**ransfer. API Design Standard. 
> 
>
>**Methoden:**
>- GET
> - POST
> - PUT
> - PATCH
> - DELETE


### API-Design

<span style="color:#00b0f0">Eine well-designed API..</span>.
- … bietet Erleichterung und transportiert nicht nur Daten einer Datenbank über HTTP.
- … sollte den Erwartungen von Entwicklern für Qualität und Standards gerecht werden.

**Merkmale einer guten API**
- einfach zu **lernen, nutzen, erweitern**
- erfüllt die **Anforderungen**
- passend für die **Zielgruppe**

**Wozu APIs?**
- interner **Datenzugriff** und erhöhte **Agilität**
- Generierung von **B2B Synergien**
- Vermarktung **digitaler Assets** an dritte
- Realisierung einer **Omni-Channel Strategie**


### OpenAPI

>[!INFO] Definition
>Die OpenAPI Specification ist ein Standard zur Beschreibung von HTTP-Programmierschnittstellen. Mit ihr können auch REST-konforme Schnittstellen definiert werden

**Wozu OpenAPI?**
- OpenAPI ermöglicht die abstrakte Beschreibung von RESTSchittstellen auf einheitliche Weise
- API-Definition werden mit den Formaten JSON und YAML verfasst.
- JSON
	- JavaScript Object Notation
- YAML
	- Yet Another Markup Language

**JSON v YAML**
```json
// JSON
{
"servers": [
	{
		"url": "https://development.example.com/v1",
		"description": "Development server"
	},
	{
		"url": "https://staging.example.com/v1",
		"description": "Staging server"
	},
	{
		"url": "https://api.example.com/v1",
		"description": "Production server"
	}
	]
}
```

```yaml
// YAML
servers:
- url: https://development.example.com/v1
description: Development server
- url: https://staging.example.com/v1
description: Staging server
- url: https://api.example.com/v1
description: Production server
```

**Endpunkte anhand einer Spezifikation finden**
```yaml
paths:
  /users:
    get:
      summary: Liste aller Benutzer
      description: Gibt eine Liste aller Benutzer zurück.
    post:
      summary: Benutzer erstellen
      description: Erstellt einen neuen Benutzer.
  /users/{userId}:
    get:
      summary: Einzelner Benutzer abrufen
      description: Gibt Informationen zu einem einzelnen Benutzer zurück.
    put:
      summary: Benutzer aktualisieren
      description: Aktualisiert die Informationen eines Benutzers.
    delete:
      summary: Benutzer löschen
      description: Löscht einen Benutzer.

```

In diesem Beispiel sind die Endpunkte: `/users` & `/users/{userID}`



### Docker

>[!INFO] Was ist Docker?
>  Docker ist eine freie Software zur Isolierung von Anwendungen mit Hilfe von Containervirtualisierung.

**Anwendungsbereich**
Docker ist **vor allem für DevOps und Entwickler** gedacht 

ENTW (dev)
QS (test)
PROD (prod)

**Setup**
Docker download - https://docs.docker.com/desktop/install/windows-install/

```bash
docker pull ubuntu // Vorkonfigurierte Images herunterladen
docker pull ubuntu:YYMM // Spezifische Version herunterladen

docker run –it <image> <application>
• i … interaktiv (STDIN bleibt geöffnet)
• t … TTY – "Terminal"
docker run -it ubuntu bash

docker images // Listet alle geladenen Images auf
docker ps -a

docker stop <id/name> // stop
docker kill <id/name> // hard stop
docker rm <id/name> // remove container
docker rmi ubuntu:20.10 // remove image
docker system prune --all --volumes // remove container & images

docker run -d –-name webserver –p 8080:80 nginx // Portweiterleitung mit -p
```

**Docker images erstellen**
Bsp. Node.js App im Docker-Container

```
FROM node:18.18.2  
WORKDIR /app  
COPY . /app  
RUN npm install  
EXPOSE 3000  
CMD node index.js
```

Docker command: `docker build <pathOfDockerfileDirectory>`
`docker build .` "." bedeutet jetziges directory