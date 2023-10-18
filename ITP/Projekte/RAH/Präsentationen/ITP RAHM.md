---
tags: ITP, RAH
---
# Default- und Rest-Parameter in ES6

## Default-Parameter in ES6

Default-Parameter werden verwendet, um Parametern in Funktionen Standartwerte zu geben. Diese werden in der Funktion verwendet, falls kein anderer Wert beim Methodenaufruf angegeben wird.

```javascript

function sayHello(name = 'User') {
	console.log(´Hello, ${name}.`)
}

sayHello();
sayHello('Austin');
```

Der erste Aufruf gibt "Hello, User." aus, der zweite "Hello, Austin".
In diesem Fall ist User der Default-Parameter.

## Rest-Parameter

Rest-Parameter werden verwendet, um eine nicht-sichere Anzahl an Argumente in einem Array zu speichern, wodurch man diese verarbeiten kann, obwohl man die genaue Anzahl nicht von Anfang an weiß.

```javascript

function add(...numbers) {
	let sum = 0;
	for (let number of numbers) {
		sum += number;
	}
	return sum;
}

console.log(add(3,6,9));
```

Die Ausgabe in diesem Fall ist 18, man kann hier durch die for-each Schleife jedoch auch mehr oder weniger Parameter angeben.

# Spread Operator für Arrays

Mit Spread Operators "..." kann man Arrays:
1. weitere Elemente hinzufügen
	```javascript
const startArray = [1, 2, 3];
const newArray = [...startArray, 4];

console.log(newArray);

```
2. kopieren
```javascript
const startArray = [1, 2, 3];
const copiedArray = [...startArray];

console.log(copiedArray);

```
3. zusammenfügen
```javascript
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const combined = [...array1, ...array2];

console.log(combined);
```
4. Als Parameter in einer Funktion verwenden
```javascript
function add(a, b, c) {
  return a + b + c;
}

const numbers = [1, 2, 3];
const sum = add(...numbers);

console.log(sum);
```

Sie sind sehr nützlich um javascript übersichtlicher und einfacher zu schreiben zu machen.