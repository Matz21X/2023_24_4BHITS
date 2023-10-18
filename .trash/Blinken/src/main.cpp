#include <Arduino.h>


#define LEDPIN 18

void setup() {
  pinMode(LEDPIN, OUTPUT);
}

void loop() {
  digitalWrite(LEDPIN, HIGH);
  delay(300);
  digitalWrite(LEDPIN, HIGH);
  delay(300);
}

