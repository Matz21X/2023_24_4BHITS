#include <Arduino.h>




void setup() {
  Serial.begin(9600);
  pinMode(36, ANALOG );
}

void loop() {
  Serial.println( analogRead(36));
  delay( 1000 );
}

