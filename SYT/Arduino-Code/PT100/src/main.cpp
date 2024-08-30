#include <Arduino.h>

// Konstanten für den Spannungsteiler
const float R_FIXED = 1000.0; // Fester Widerstandswert in Ohm
const int ADC_PIN = A0;       // ADC-Pin am ESP8266

void setup() {
  Serial.begin(9600);
}

void loop() {
  // ADC-Wert lesen
  int adcValue = analogRead(ADC_PIN);
  
  // Spannung berechnen (ESP8266 hat eine Referenzspannung von 1V für den ADC)
  float voltage = adcValue * (1.0 / 1023.0); // ADC-Wert in Spannung umrechnen
  
  // Widerstand des PT100 berechnen
  float resistance = (R_FIXED * voltage) / (1.0 - voltage);

  // Widerstandswert ausgeben
  Serial.print("PT100 Widerstand: ");
  Serial.print(resistance);
  Serial.println(" Ohm");

  // Kleiner Delay für Stabilität
  delay(1000);
}
