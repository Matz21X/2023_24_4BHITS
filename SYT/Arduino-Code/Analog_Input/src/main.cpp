#include <Arduino.h>

void setup() {
  Serial.begin(9600);
  pinMode(36, ANALOG );
  ledcSetup(0, 60, 8);
  ledcAttachPin( 18, 0 );
}

int getValue(int analogValue) {
  return analogValue / 16;
}

int getPercent() {
  return 0.024 * analogRead (36);
}

void loop() {
  Serial.println( getValue( analogRead(36)));
  

  ledcWrite(0, getValue( analogRead(36))); 
}
