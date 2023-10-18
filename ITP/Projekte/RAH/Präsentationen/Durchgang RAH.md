### Block-Scope, let und const
**Block Scope**
Man kann auf eine in einem if, switch, for- oder while loops deklarierte Variable nicht außerhalb von ihnen zugreifen.
Bsp.:
```js
{
  let b = 10;
  console.log(b);
}
console.log(b);
```
Die Erste Ausgabe funktioniert, die nächste führt zu einem Fehler.

**Function Scope**
Man kann auf eine in einer Funktion deklarierte Variable nicht außerhalb von der Funktion zugreifen.

**let verwendet block scope
var verwendet function scope**

**Let und Const**
let ist eine veränderbare Variable
Bsp.:
```js
let a = 10;
a = 20;
console.log(a);
```
Funktioniert einwandfrei 😎

const ist eine nicht veränderbare Variable
Bsp.:
```js
const a = 10;
a = 20;
console.log(a);
```

### Template Strings
**Multiline String**
Jeder Zeilenumbruch wird mitgezählt
```js
const address = `Eduard Müller  
Anton Ehrenfried-Straße 10  
2020 Hollabrunn`;

console.log(address);
```
Ausgabe:
```
Eduard Müller  
Anton Ehrenfried-Straße 10  
2020 Hollabrunn
```

**String Interpolation**
Variablen in einen String eingeben
Bsp1.:
```js
const firstName = "Eduard";  
const lastName = "Müller";  
const street = "Anton Ehrenfried-Straße";  
const houseNr = 10;  
const zipCode = 2020;  
const city = "Hollabrunn";  
  
const address = `${firstName} ${lastName}  
${street} ${houseNr}  
${zipCode} ${city}`;  
  
console.log(address);
```
Ausgabe:
```
Eduard Müller  
Anton Ehrenfried-Straße 10  
2020 Hollabrunn
```

Bsp2.:
```js
const add = `1 + 1 = ${1 + 1}`;
console.log(add);
```
Ausgabe:
``1 + 1 = 2

