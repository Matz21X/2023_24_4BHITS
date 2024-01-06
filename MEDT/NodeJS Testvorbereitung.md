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