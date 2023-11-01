**# HTTP-Client in Java
#SEW 

>29.9.23

Java besitzt seit der Version 11 ein modernes HTTP-Client API, dieses ersetzt die Klasse `HttpURLConnection` die früher in Java für die HTTP Kommunikation zuständig war. 

Das API befindet sich im Package `java.net.http` und besteht aus folgenden Klassen bzw. Interfaces:

- **HttpRequest
	- Mit dieser Klasse ist es möglich vollständige Http methodenaufrufe (`get, post , ...`) - inklusive URL und Daten - zu erstellen. Dabei nutzt die Klasse das Builder-Pattern (Entwurfsmuster)
- **HttpClient
	- Alle mit HttpRequest erstellten Anfragen werden mittels HttpClient gesendet, wobei diese sowohl synchron als auch asynchron abgesetzt werden können. Synchron bedeutet, dass der Aufruf auf das Ergebnis wartet (blockieren), Asynchron bedeutet, dass nicht auf das Ergebnis gewartet wird, sondern die nächstfolgende Codezeile ausgführt wird (nicht blockieren)
- **HttpResponse
	- Diese Klasse repräsentiert die Antwort der Servers, sie bietet viele hilfreiche Methoden, die wichtigsten aber sind:
		- `statusCode()`: Liefert den Statuscode der Antwort (200 OK)
		- `body()`: Liefert die Daten der Anfrage
		- [Weitere Infos](https://www.baeldung.com/java-9-http-client)
		- [Java API-Doc](https://docs.oracle.com/en/java/javase/11/)