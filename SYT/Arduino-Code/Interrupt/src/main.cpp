#include <Arduino.h>

// Pin, an dem der Schalter angeschlossen ist
const int switchPin = 2;

// Variable zur Zählung
volatile int count = 0;

void IRAM_ATTR handleInterrupt() {
  // Interrupt-Routine: Schalter wurde betätigt
  count++;
}


void setup() {
  Serial.begin(9600);
  
  // Initialisierung des Schalterpins
  pinMode(switchPin, INPUT_PULLUP);
  
  // Attach Interrupt für den Schalter
  attachInterrupt(digitalPinToInterrupt(switchPin), handleInterrupt, FALLING);
}

void loop() {
  // Ausgabe der aktuellen Zählung auf der Konsole
  Serial.println("Count: " + String(count));
  
  // Kurze Verzögerung, um die Serielle Konsole nicht zu überlasten
  delay(500);
}
