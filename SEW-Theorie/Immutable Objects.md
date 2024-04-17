# Immutable Objects
#SEW

>Der<span style="color:#00b050"> innere Zustand</span> eines unveränderlichen Objekts bleibt<span style="color:#00b050"> immer konstant</span>, nach dem es erzeugt wurde. Damit ist sichergestellt, dass sich unveränderliche Objekte über die <span style="color:#00b050">gesamte Lebenszeit gleich verhalten</span>.

### Wie kann eine Unveränderlichkeit erreicht werden?
- <span style="color:#00b050">Keine setter Methoden</span> in der API der Klasse zur Verfügung stellen
- Alle Eigenschaften ``final`` und ``private`` setzen
- Aberben verbieten (keine Subklassen), die Klasse als ``final`` deklarieren (``public final class User ...``)

### Beispiele für Unveränderliche Klassen:
- String 
- Wrapper Klassen
	- Integer
	- Long
	- Local

### Vorteile
- Unveränderliche Objekte sind <span style="color:#00b050">einfach zu testen</span>
- <span style="color:#00b050">Automatisch Threadsicher</span> und <span style="color:#00b050">keine Synchronisations-Probleme</span>, da der innere Zustand nicht verändert werden kann, sehen alle Threads immer das gleiche
- Default ``clone`` Methode funktioniert (Keine eigene Implementierung notwendig)

Speziell in <span style="color:#00b050">Multithread-Umgebungen</span>, bieten Unveränderliche Objekte den <span style="color:#00b050">entscheidenden Vorteil</span> der Thread-Sicherheit. Webservices beispielsweise, sollten immer Threadsicher realisiert sein, da viele Clients gleichzeitig darauf zugreifen können

