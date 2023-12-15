# Builder (Pattern)
#SEW 

[Help Link](https://howtodoinjava.com/design-patterns/creational/builder-pattern-in-java)

Das Builder Entwurfsmuster ist eine Möglichkeit Objekte zu erstellen. Es hilft bei der Erstellung unveränderlicher Objekten, die eine große Anzahl von Eigenschaften aufweisen.

Wenn man von einem Userobjekt ausgeht, dass 5 `final` Eigenschaften besitzt `(firstName, lastName, age, phone, address)` wovon nur `firstName` und `lastName` verpflichtend sind, führt das zu einer hohen Anzahl von Konstruktoren <span style="color:#00b0f0">(telescoping constructor problem)</span>

Das Builder Pattern bietet eine elegante Lösung bei der die Unveränderlichkeit der Objekte erhalten bleibt.

```java
public static void main (String [] args){
	User user1 = new User.UserBuilder("Bart", "Simpson")
	.age(13)
	.phone("123467")
	.address("Springfield, 308 Negra Arroyo Lane, ABQ")
	.build()

	System.out.println(user1)
}
```

```java
public static void main (String [] args){
	User user1 = new User.UserBuilder("James", "Bond")
	.age(13)
	.phone("123467")
	.address("Springfield, 308 Negra Arroyo Lane, ABQ")
	.build()

	System.out.println(user1)
}
```