# Python

Python ist eine hochpopuläre, interpretierte Programmiersprache, die für ihre Einfachheit und Lesbarkeit bekannt ist. Sie wurde in den späten 1980er Jahren von Guido van Rossum entwickelt und hat sich seitdem zu einer der beliebtesten Sprachen in der Softwareentwicklung entwickelt.

### **Vorteile von Python:**

- Interpretierte Sprache
- Gut lesbar
- Knapper Stil
- Objektorientiert
- Dynamisch typisiert
- In Python ist alles ein Objekt: Klassen, Typen, Variablen, …
- Es gibt viele Datentypen:
	  int, long, float, bool, complex, str, list, tuple, range, dict, set, bytes, NonType, …
- Keine Variablendeklaration
- Der Typ einer Variablen kann mit type abgefragt werden

### Operatoren

| Funktionsweise       | Code                                       |
| -------------------- | ------------------------------------------ |
| Operatoren           | `+, -, *, /, %, **, // (Ganzzahldivision)` |
| Vergleichsoperatoren | `<,>,<=,>=,==, !=`                         |
| logische Operatoren  | `and, or, not`                             |
| andere Operatoren    | `is, is not, in, not in`                   |
| Ausgabe              | `print()`                                  |
| Formatfunktion       | `print(“Wert 1: {} Wert 2:{}”.format(var1,var2)`                                           |


### Variablen - Zuweisung, Sichtbarkeit, Typen

- mehrfache Zuweisung möglich:
	  ``x, y, z = 5, 3, “A“
- Zuweisung außerhalb einer Funktion -> globale Variable
- Zuweisung innerhalb einer Funktion -> lokale Variable  (Zusatz `global` möglich)
- Casting:
	  ``zahl1 = int(5) / int(5.3) / int(“5“)
	  ``zahl2 = float(5)
	  ``str1 = str(5)
- Typ einer Variablen abfragen:
	  ``print(type(var1))


### Strings - Slicing, Stringfunktion

- Aus Strings/Listen können Zeichen herausgeholt werden (slicing):
	 ``str1 = “Hallo Leute!“
	 ``str2 = str1[1:4]
	 ``-> liefert: “all“
- nützliche Methoden:
	``str1.upper()     -> Großbuchstaben
	``str1.lower()    -> Kleinbuchstaben
	``str1.split(“,“)    -> mehrere Strings durch Trennzeichen
	``str1.replace(“a“,“x“)  -> Zeichen “a“ durch “x“ ersetzen``
	``…


### Datenstrukturen - Liste

- Liste erstellen:    
	- ``liste = [1,5,2.5,”AB”,…]   
	- ``len(liste)  # liefert Länge
- Elemente hinzufügen:   
	- ``liste.append(34)
	- ``liste.insert(1,34)
	- ``liste.append([5,2,7]) # Tupel möglich
- auf Element  zugreifen: 
	- ``liste[3], liste[-1]
- mehrere Elemente:   
	- ``liste[:5], liste[3:], liste[3:6]  
- Elemente ändern:
	- ``liste[2] = 4, liste[3:4]= [6,8],   
	- ``liste[3] = [4,5]  
- Element  löschen:  
	- ``liste.remove(3)  # Wert 3 NICHT Index 3  
	- ``liste.pop(3)  # Index 3  
	- ``liste.clear()


### Datenstrukturen - Tupel

Tupel: Werte können nicht verändert werden (im Gegensatz zu Listen)
- Tupel erstellen:	 	              ``t = (1,2,3,…)
- auf Element zugreifen: 		``t[0], t[:2], …

Range: ein eigener Datentyp – Anfangswert bis exklusive Endwert
- Range erstellen:		       ``r = range(0,6) 	
- In Liste umwandeln:		``list(range(0,6))  [0,1,2,3,4,5]


### Datenstrukturen - Dictionary

Enthält Key-Value-Paar  (verschachteln möglich)

| Operation                         | Code                               |
| --------------------------------- | ---------------------------------- |
| Dictionary erstellen              | `d = {key1:wert1, key2:wert2, …}`  |
| Elemente hinzufügen               | `d[“Name“] = “Franz“`              |
| alle Schlüssel / Werte / Elemente | `d.keys(), d.values(),  d.items()` |
| auf Wert zugreifen                | `d[key1]`                          |
| Wert ändern/hinzufügen            | `d.update({“key1“,neuerWert})`     |
| Element  löschen                  | `d.pop(“key1“)    d.clear()`                                   |


### Datenstrukturen - Set

Werte können nicht doppelt vorhanden sein und es gibt keine Reihenfolge (vergleiche mit mathematischer Menge)

| Operation       | Code                               |
| --------------- | ---------------------------------- |
| Set erstellen   | `s = {1,3,1,2,6,4}  à {1,2,3,4,6}` |
| Wert hinzufügen | `s.add(20)`                        |
| Element löschen | `s.remove(2)  # Element 2!`        |
| Element löschen | `s.clear()`                        | 


### Auswahlanweisung 

```python
if x > 0:    
	print(“positiv”)  
elif x < 0:    
	print(“negativ”)  	
else:    print(“0”)
```


### Schleifen 

```python
# for-each-Schleife
for element in liste:
	print(element)

# for-Schleife (mittels range):
for i in range(len(liste)):
	print(liste[i])

# while-Schleife
i = 1
while i < len(liste):
	print(liste[i])
	i = i+1

# Listen Abstraktion (list comprehension)
liste = [1,22,3,4]
liste = [x**2 for x in liste if x < 10]
```


### Funktionen

Funktionen: (mit Standardwerte für Parameter)

```python
def summe (a=0, b=0):
	return (a+b)
```

Lambda-Funktion: (anonyme Funktion)

```python
lambda x: x**2

# Aufruf durch zB: 
erg = (lambda x:x**2) (3)

for item in liste:
	(lambda x: x**2) (item)
```


### Filter- / Map-Funktion

- map-Funktion: die Funktion f wird auf alle Listenelemente angewandt:
```python
map(f,liste)
liste = list(map(lambda x:x*2,liste))
```

- filter-Funktion: liefert alle Elemente der Liste, für die die Funktion f True  ergibt:
```python
filter(f,liste)
  liste = list(filter(lambda x:x>10,liste))
```


### Bilder anzeigen

```python 
import cv2 as cv  

img = cv.imread("Photos/cat_large.jpg")  
cv.imshow("Cat", img)    
cv.waitKey(0) #needed for picure to stop displaying on random keypress
```


[CreditCardImageProcessing](https://www.askpython.com/python/examples/opencv-credit-card-reader)


#ITP 