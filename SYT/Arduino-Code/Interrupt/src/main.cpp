#include <Arduino.h>
#define debounceZeit 50
unsigned long alteZeit=millis();
int counter=0;
int oldCounter=-1;
void IRAM_ATTR ISR();
 
void setup() {
  Serial.begin(9600);
  pinMode(18,INPUT_PULLDOWN);
  attachInterrupt(18,ISR,FALLING);
  Serial.print("begin: ");
  Serial.print(counter);
}
void IRAM_ATTR ISR(){
  if ((millis()-alteZeit)>debounceZeit){
    counter++;
    alteZeit=millis();
  }
}
 
void loop() {
  if(oldCounter!=counter){
    Serial.println(counter);
    oldCounter=counter;
  }
}