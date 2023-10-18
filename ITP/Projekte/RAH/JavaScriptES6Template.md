# ES.6 Zusammenfassung

## Variablen Block-Scope, let und const

**Definition**

Ab ES.6 ist es möglich, dass ganz normale Blöcke Sichbarkeitsbereiche aufmachen. Es gibt dazu zwei Schlüsselwörter: `let` und `const`. Mit `let` deklarierte Variablen haben Block-Sichbarkeiten, während  `const` eine Initialisierung der Variablen erfordert und diese dazu unveränderlich macht. Eine spätere Zuweisung der Variablen würde zu einem Fehler führen. 

**Einsatzgebiet mit Anwendungsbeispielen**

```javascript
{
	let b = 10;
  console.log(b); //  => 10
}
console.log(b);
// ReferenceError: b is not defined
```



**Besonderheiten**

## Template Strings

Tbd