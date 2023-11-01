# RESTful Webservices
#SEW

Webservices bieten die Möglichkeit Dienste, die ein Server zur Verfügung stellt, anzusprechen. RESTful Webservices folgen den REST-Grundprinzipien.

==Eindeutige Definition von Ressourcen==
	z.B.: https://shop.htlhl.at/products/75
==Verwendung von http Standardmethoden==
	z.B.: GET, POST, PUT, PATCH, DELETE
	Analogie objektorientierte Methode vs RESTful Webservice:
		getUsers() GET https://shop.htlhl.at/users
		updateUsers(int id, User user) PATCH https://shop.htlhl.at/users/{id}
		addUser(User user) POST  https://shop.htlhl.at/users
		deleteUser(int id) DELETE  https://shop.htlhl.at/users/{id}

==Statuslose Kommunikation==
Bei RESTful Webservices gibt es keinen Sitzungsstatus, der serverseitig gespeichert wird. Stattdessen muss der Kommunikationszustand im Client gespeichert werden.
	<span style='color:#20bf6b'>Vorteile</span>: Neustart des Servers, Skalierbarkeit


   ![[RESTful_Webservices.drawio.svg]]
**Operationen**

| **Operation** | **Request**                               |
| ------------- | ----------------------------------------- |
| CREATE        | <span style="color:#00b050">POST</span>   |
| READ          | <span style="color:#00b050">GET</span>    |
| UPDATE        | <span style="color:#00b050">PUT</span>    |
| DELETE        | <span style="color:#00b050">DELETE</span> |
