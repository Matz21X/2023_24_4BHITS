# Mikrocontroller

>[!INFO]
Ein Mikrocontroller ist ein spezialisiertes, kompaktes Gerät, das in eingebetteten Systemen zur Steuerung von Hardwarekomponenten wie Sensoren und Aktuatoren eingesetzt wird, während ein Laptop ein vielseitiger, leistungsstarker Computer für allgemeine Anwendungen ist. Mikrocontroller sind auf spezifische Aufgaben ausgerichtet und haben begrenzte Rechenleistung, während Laptops mobil sind und eine breite Palette von Funktionen für Benutzer bieten.

- General Purpose Input Output (GPIO)

Lässt LED in 300ms Abständen über GPIO 18 Blinken

```c++
#include <Arduino.h>
#define LEDPIN 18

void setup() {
  pinMode(LEDPIN, OUTPUT);
}
  
void loop() {
  digitalWrite(LEDPIN, HIGH);
  delay(300);
  digitalWrite(LEDPIN, LOW);
  delay(300);
} 
```

![[circuit.svg]]

#SYT 

