# Immutable Objects
#SEW

>Der innere Zustand eines unveränderlichen Objekts bleibt immer konstant, nach dem es erzeugt wurde. Damit ist sichergestellt, dass sich unveränderliche Objekte über die gesamte Lebenszeit gleich verhalten.

### Wie kann eine Unveränderlichkeit erreicht werden?
- Keine setter Methoden in der API der Klasse zur Verfügung stellen
- Alle Eigenschaften ``final`` und ``private`` setzen
- Aberben verbieten (keine Subklassen), die Klasse als ``final`` deklarieren (``public final class user ...``)

### Beispiele für Unveränderliche Klassen:
- String 
- Wrapper Klassen
	- Integer
	- Long
	- Local

### Vorteile
- Unveränderliche Objekte sind einfach zu testen
- Automatisch Threadsicher und keine Synchronisations-Probleme, da der innere Zustand nicht verändert werden kann, sehen alle Threads immer das gleiche
- Default ``clone`` Methode funktioniert (Keine eigene Implementierung notwendig)

Speziell in Multithread-Umgebungen, bieten Unveränderliche Objekte den entscheidenden Vorteil der Thread-Sicherheit. Webservices beispielsweise, sollten immer Threadsicher realisiert sein, da viele Clients gleichzeitig darauf zugreifen können

