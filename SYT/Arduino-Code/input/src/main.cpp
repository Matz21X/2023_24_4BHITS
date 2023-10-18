#include <Arduino.h>
#define LEDPIN 18
#define INPUT_PIN 25
#define INPUT_PIN2 33

void setup() {
  Serial.begin( 9600 );
  pinMode(LEDPIN, OUTPUT);
  pinMode(INPUT_PIN, INPUT_PULLDOWN);
  pinMode(INPUT_PIN2, INPUT_PULLDOWN);
}
  
void loop() {
  if (digitalRead(INPUT_PIN2) == HIGH){
    if(digitalRead(INPUT_PIN) == HIGH){
      Serial.println("---FLASHING---");
      digitalWrite(LEDPIN, LOW);
      Serial.println("OFF");
      delay(16);
      digitalWrite(LEDPIN, HIGH);
      Serial.println("ON");
      delay(16);
    } else {
      
      digitalWrite(LEDPIN, HIGH);
      Serial.println("ON");
    }
  
  } else {
    Serial.println( "OFF");
    digitalWrite(LEDPIN,LOW);
  }

} 