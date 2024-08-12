#include <Arduino.h>



void setup() {
  pinMode(4, INPUT_PULLUP);
  pinMode(D0, OUTPUT);
  pinMode(0, INPUT_PULLUP);
  Serial.begin(9600);
}

void loop() {
  if (digitalRead(4) == LOW){
    digitalWrite(D0, LOW);
    Serial.println("UNSAFE");
  } else {
    digitalWrite(D0, HIGH);
    Serial.println("Waterlevel save");
  }
  
  if (digitalRead(0)== LOW){
    digitalWrite(D0, HIGH);
    digitalWrite(4, LOW);
    Serial.println("FLASH");
  }

  delay(100);
}

