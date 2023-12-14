# NoSql injections
#ITP 

><span style="color:#00b050">NoSQL Injection ist eine Sicherheitslücke, die in nicht-relationalen Datenbanken (NoSQL-Datenbanken) auftritt. Ähnlich wie SQL Injection ermöglicht NoSQL Injection einem Angreifer, bösartigen Code in Anfragen einzufügen und somit unautorisierten Zugriff auf Daten zu erlangen.</span>

**NoSQL injection erlaubt dem angreifer:**
- Bypass authentication or protection mechanisms.
- Extract or edit data.
- Cause a denial of service.
- Execute code on the server.

**Die 2 Arten von NoSQL Injection:**
- Syntax injection
- Operator injection

### 2.1 Einfaches Beispiel

Angenommen, eine Anwendung verwendet MongoDB und eine Benutzerauthentifizierung mit einer Abfrage wie:

`db.users.find({ username: 'benutzername', password: 'passwort' });`

Ein Angreifer könnte versuchen, sich durch die Eingabe von `{"$ne": null}` als Passwort zu authentifizieren, um die Bedingung zu umgehen:

`db.users.find({ username: 'benutzername', password: {"$ne": null} });`

### 2.2 Erweitertes Beispiel

Eine Anwendung könnte eine Anfrage zum Abrufen von Benutzerinformationen haben:

`db.users.find({ username: 'benutzername' });`

Ein Angreifer könnte versuchen, die Anfrage zu manipulieren, um alle Benutzerdaten abzurufen:

`db.users.find({ $where: 'this.username == "benutzername" || 1==1' });`

## 3. Präventive Maßnahmen

Um NoSQL Injection zu verhindern, sollten folgende Maßnahmen ergriffen werden:

- **Verwenden Sie Parameterisierte Abfragen:** Stellen Sie sicher, dass alle Benutzereingaben als Parameter behandelt werden und nicht direkt in die Abfrage eingefügt werden.
    
- **Validierung der Benutzereingaben:** Überprüfen und validieren Sie alle Benutzereingaben, um sicherzustellen, dass sie den erwarteten Formaten entsprechen.
    
- **Begrenzung von Berechtigungen:** Gewähren Sie nur die notwendigen Berechtigungen für Datenbankzugriffe und vermeiden Sie übermäßige Privilegien.

