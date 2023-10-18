# Vorbereitung
#ITP

Themen: 
- Destructuring von Objekten und Arrays
- Klassen (constuctor, read-only Property, Getter)
- Array-Funktionen (min. `foreach(), map(), filter()...`)

### Destructuring

Destructuring in JavaScript ermöglicht es, Werte aus Objekten und Arrays zu extrahieren und in separaten Variablen zu speichern. 

**Destructuring von Objekten:**
```js
const person = { name: 'Alice', age: 30 };

// Destructuring von Objektattributen
const { name, age } = person;

console.log(name); // Gibt 'Alice' aus
console.log(age);  // Gibt 30 aus
```

**Destructuring von Arrays:**
```js
const colors = ['Rot', 'Grün', 'Blau'];

// Destructuring von Array-Elementen
const [firstColor, secondColor, thirdColor] = colors;

console.log(firstColor);  // Gibt 'Rot' aus
console.log(secondColor); // Gibt 'Grün' aus
console.log(thirdColor);  // Gibt 'Blau' aus
```

Durch Destructuring kannst du einfach auf Werte in Objekten und Arrays zugreifen und sie in benannten Variablen speichern. Dies erleichtert das Arbeiten mit komplexen Datenstrukturen.

### Klassen

JavaScript-Klassen werden verwendet, um Objekte mit Methoden und Eigenschaften zu erstellen. Hier ist ein Beispiel, das eine Klasse mit einem Konstruktor, einer schreibgeschützten Eigenschaft und einem Getter zeigt:

```js
class Person {
  constructor(name, age) {
    this._name = name;
    this._age = age;
  }

  // Getter für das Alter
  get age() {
    return this._age;
  }

  // Eine schreibgeschützte Eigenschaft
  get isAdult() {
    return this._age >= 18;
  }
}

const alice = new Person('Alice', 30);
console.log(alice.name); // undefined, da _name nicht direkt zugänglich ist
console.log(alice.age); // 30, über den Getter
console.log(alice.isAdult); // true, über den Getter
```

In diesem Beispiel:

- Die `Person`-Klasse hat einen Konstruktor, der beim Erstellen eines `Person`-Objekts aufgerufen wird und `name` und `age` initialisiert.
- Der Getter `age` ermöglicht den Zugriff auf das Alter über `alice.age`.
- Der Getter `isAdult` gibt zurück, ob die Person volljährig ist oder nicht.
- `_name` und `_age` sind als Konvention mit einem Unterstrich versehen, um sie als private Felder zu kennzeichnen. Sie sollten normalerweise nicht direkt zugänglich sein. Der Zugriff erfolgt über die Getter-Methode.

### Array-Funktionen

JavaScript bietet nützliche Array-Funktionen wie `forEach()`, `map()`, `filter()`, `sort()`, `find()` um die Verarbeitung von Arrays zu erleichtern. Hier ist eine kurze Erklärung und Beispiele für jede Funktion:

#### forEach()
Diese Funktion führt eine bereitgestellte Funktion einmal für jedes Element im Array aus.

```js
const numbers = [1, 2, 3, 4];
numbers.forEach((number) => {
  console.log(number);
});
// Gibt 1, 2, 3, 4 in der Konsole aus.
```


#### map()
Die `map()`-Funktion erstellt ein neues Array, indem sie eine bereitgestellte Funktion auf jedes Element im Ausgangsarray anwendet.

```js
const numbers = [1, 2, 3, 4];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
// Gibt [2, 4, 6, 8] aus.
```


#### filter()
Mit `filter()` kannst du ein neues Array erstellen, das nur die Elemente enthält, die einer bestimmten Bedingung entsprechen.

```js
const numbers = [1, 2, 3, 4];
const evenNumbers = numbers.filter((number) => number % 2 === 0);
console.log(evenNumbers);
// Gibt [2, 4] aus.
```


#### sort()
Mit `sort()` kannst du die Elemente im Array sortieren. Beachte, dass es das ursprüngliche Array ändert.

```js
const fruits = ['Banane', 'Apfel', 'Dattel', 'Kirsche'];
fruits.sort();
console.log(fruits);
// Gibt ["Apfel", "Banane", "Dattel", "Kirsche"] aus.
```

#### find()
`find()` gibt das erste Element im Array zurück, das einer bestimmten Bedingung entspricht.

```js
const numbers = [1, 2, 3, 4];
const found = numbers.find((number) => number > 2);
console.log(found);
// Gibt 3 aus (das erste Element, das größer als 2 ist).
```
 

