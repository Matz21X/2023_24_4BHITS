# NoSQL attack JuiceShop
#ITP 

In diesem Beispiel wird gezeigt wie eine NoSQL Attacke durchgeführt wird. Ziel dieses Beispiels ist es Reviews von Produkten zu ändern.

### Step 1 (Account erstellen)
Zuerst ist es notwendig einen Account auf im JuiceShop zu erstellen
![[UserRegistration.png]]
### Step 2 (Packet finden)
Nun müssen wir das richtige Packet in den Entwickleroptionen finden wenn wir ein Produkt anklicken.
![[Packages.png]]

### Step 3 (Review posten)
Jetzt müssen wir ein eigenes Review posten um zu sehen welche API's aufgerufen werden.
![[201Created.png]]
In diesem Fall wurde eine PUT Anfrage an den Server gesendet. Als Nutzlast ist folgendes vorhanden:
```json
{message: "Testreview", author: "example@example.com"}
	author: "example@example.com"
	message: "Testreview"
```
