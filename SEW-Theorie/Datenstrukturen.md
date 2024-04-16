# Datenstrukturen
#SEW #GEI 

Datenstrukturen werden benötigt um Daten zu speichern, zu organisieren und zu verwalten. Sie ermöglichen die effiziente Verarbeitung von Daten und sind grundlegend für die effektive Implementierung von Algorithmen.

<span style="color:#00b0f0">Bsp: Suchen, Sortieren...</span>

**Die wichtigsten Vertreter sind:**

<span style="color:#00b050">List (z.B. ArrayList, LinkedList...)</span>
-  Doppelte Objekte erlaubt (können abgespeichert werden), Reihenfolge bleibt erhalten, komfortable Alternative zu Arrays
```java
List <String> stringList = new ArrayList<>();
stringList.add("Bruh");
```

<span style="color:#00b050">Set (z.B. HashSet, TreeSet...)</span>
- Menge mit Objekten in der jedes Element nur einmal vorkommt
```java
Set <String> nameSet = new Set<>();
nameSet.add("Baracko bama");
```

<span style="color:#00b050">Map (z.B. HashMap)</span>
- Helfen bei der Speicherung von Schlüssel-Wert Paaren (Key-Value-Pairs)
```java
Map <String, String> capitalCities = new HashMap<String, String>();

// add keys and values
capitalCities.put("Austria", "Vienna");
```

<span style="color:#00b050">Queue</span>
- Realisierung von FIFO (first-in first-out) und LIFO (last-in first-out) Speicher

## Datenstrukturen Konzepte

![[Datenstrukturen-20240405102814550.png]]

****
## Verkettete Liste

>Eine Verkettete Liste ist eine dynamische Datenstruktur in der Datenelemente geordnet gespeichert sind.

![[VerketteteListe.drawio.svg]]

## Binäre Bäume
 

![[Baum.drawio.svg]]