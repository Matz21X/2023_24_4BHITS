# NoSQL attack JuiceShop
#ITP 

In diesem Beispiel wird gezeigt wie eine NoSQL Attacke durchgeführt wird. Ziel dieses Beispiels ist es Reviews von Produkten zu ändern.
### Step 1 (Account erstellen)
Zuerst ist es notwendig einen Account auf im JuiceShop zu erstellen
![](attachment/37123315f963400e428dbfc7cba69c8c.png)
### Step 2 (Packet finden)
Nun müssen wir das richtige Packet in den Entwickleroptionen finden wenn wir ein Produkt anklicken.
![](attachment/612240cccaca5aea6c621c2e329008ce.png)
### Step 3 (Review posten)
Jetzt müssen wir ein eigenes Review posten um zu sehen welche API's aufgerufen werden.
![](attachment/063cf185f13c1973cfd8269d7990baca.png)
In diesem Fall wurde eine PUT Anfrage an den Server gesendet. Als Nutzlast ist folgendes vorhanden:
```json
{message: "Testreview", author: "example@example.com"}
	author: "example@example.com"
	message: "Testreview"
```
### Step 4 (Testen auf Unsicherheiten)
Nun testen wir eine ob der Webserver auf SQL injections reagiert indem wir einen Paketinhalt ändern. (Rechtsklick auf Packet -> Bearbeiten und erneut senden)
![](attachment/22a89583b9d6f4938d45408436f9e768.png)
Nach dem senden kamen neue Pakete nach der angegebenen SleepTime an.
![](attachment/e9a881a33f9439b4a5439c6dbca94ec9.png)
### Step 5 (Interception)
Jetzt möchten wir mit BurpSuite unsere Anfragen bearbeiten um Zugriff auf andere Reviews zu bekommen. ==In diesem Schritt muss der geamte Webseitenverkehr durch BurpSuite geleitet werden.==
AppleJuice Reviews -> Edit Review -> Review ändern

![](attachment/4cf8a87ed3e219a4beb8cd281a44a469.png)
Rechts unten sehen wir die `id` und `message`. Diese Parameter müssen geändert werden. Zuerst muss das Packet aber erst an den Repeater in BurpSuite geschickt werden (Rechtsklick auf Packet -> Send to Repeater)
### Step 6 (Daten manipulieren)
Nun ändern wir die Daten in BurpSuite, wichtig ist uns in diesem Beispiel die `id`.

Vorher:
```json
{
	"id":"jcKpAtfAMyFRJcmHP",
	"message":"Hacked by unknown"
}
```
Nachher:
```json
{
	"id":{
		"$ne":-1
	},
	"message":"Hacked by unknown"
}
```
Das Statement `"$ne":-1` bedeutet genau so viel wie ein always-true Statement, bedeutet so viel, dass jedes Review Element auf die angegebene Message geändert wird

Nach dem senden dieses Paketes sollte die Review Seite so aussehen:
![](attachment/7f20b6925b441545b880dd551e906565.png)
Wie man auf der Grafik erkennen kann ist die Nachricht vom Account `admin@juice-sh.op` auf `Hacked by unknown geändert worden`.