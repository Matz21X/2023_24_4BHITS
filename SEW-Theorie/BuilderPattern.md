# Builder (Pattern)
#SEW 

[Help Link](https://howtodoinjava.com/design-patterns/creational/builder-pattern-in-java)

Das Builder Entwurfsmuster ist eine Möglichkeit Objekte zu erstellen. Es hilft bei der Erstellung unveränderlicher Objekten, die eine große Anzahl von Eigenschaften aufweisen.

Wenn man von einem Userobjekt ausgeht, dass 5 `final` Eigenschaften besitzt `(firstName, lastName, age, phone, address)` wovon nur `firstName` und `lastName` verpflichtend sind, führt das zu einer hohen Anzahl von Konstruktoren (<span style="color:#00b0f0">(telescoping constructor problem)</span>