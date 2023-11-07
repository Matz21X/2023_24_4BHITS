# RESTful Webservices
#SEW

<span style="color:#00b050">REPRESENTATIONAL STATE TRANSFER</span>
Webservices bieten die Möglichkeit Dienste, die ein Server zur Verfügung stellt, anzusprechen. RESTful Webservices folgen den REST-Grundprinzipien.

<span style="color:#00b050">Eindeutige Definition von Ressourcen</span>
	z.B.: https://shop.htlhl.at/products/75

<span style="color:#00b050">Verwendung von http Standardmethoden</span>
	z.B.: GET, POST, PUT, PATCH, DELETE
	Analogie objektorientierte Methode vs RESTful Webservice:
		getUsers() GET https://shop.htlhl.at/users
		updateUsers(int id, User user) PATCH https://shop.htlhl.at/users/{id}
		addUser(User user) POST  https://shop.htlhl.at/users
		deleteUser(int id) DELETE  https://shop.htlhl.at/users/{id}

<span style="color:#00b050">Statuslose Kommunikation</span>
Bei RESTful Webservices gibt es keinen Sitzungsstatus, der serverseitig gespeichert wird. Stattdessen muss der Kommunikationszustand im Client gespeichert werden.
	<span style='color:#20bf6b'>Vorteile</span>: Neustart des Servers, Skalierbarkeit


   ![[RESTful_Webservices.drawio.svg]]
### Vorteile

- Simple / Standardised
- Scaleable / Stateless
- High Performance / Caching


**Operationen**

| **Operation** | **Request**                               |
| ------------- | ----------------------------------------- |
| CREATE        | <span style="color:#00b050">POST</span>   |
| READ          | <span style="color:#00b050">GET</span>    |
| UPDATE        | <span style="color:#00b050">PUT</span>    |
| DELETE        | <span style="color:#00b050">DELETE</span> |
