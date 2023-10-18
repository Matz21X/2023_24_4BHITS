#include <Arduino.h>

#define I 27
#define II 26
#define III 25
#define IV 33

void setup() {
  pinMode( 18, OUTPUT);
  pinMode( I, INPUT_PULLDOWN);
  pinMode( II, INPUT_PULLDOWN);
  pinMode( III, INPUT_PULLDOWN);
  pinMode( IV, INPUT_PULLDOWN);
  ledcSetup(0, 144, 8);
  ledcAttachPin( 18, 0 );
  Serial.begin(9600);
}


void loop() {
  
    if (digitalRead(I) == HIGH) {
      ledcWrite(0,64);
      Serial.println("25%");
    } else if (digitalRead(II) == HIGH ){
      ledcWrite(0,128);
      Serial.println("50%");
    } else if (digitalRead(III) == HIGH) {
      ledcWrite(0,192);
      Serial.println("75%");
    } else if (digitalRead(IV) == HIGH) {
      Serial.println("100%");
      ledcWrite(0,255);  
    } else {
      Serial.println("OASCH");
      ledcWrite(0,0);
    }

  delay(100);
  
 




}
  
  

void dimming(){
  for (int i = 0; i < 255; i++)
    {
      ledcWrite(0,i);
      Serial.println("DELAY");
      //delay(20);
    }

    for (int i = 255; i >= (-1); i--)
    {
      ledcWrite(0,i);
      Serial.println("DELAY2");
      //delay(20);
    }
}