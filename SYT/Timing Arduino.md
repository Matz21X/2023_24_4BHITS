![[Whiteboard 17.04.2024.pdf]]


```C
#include <Arduino.h>

const int ledPin = 18; // Anschluss der LED

hw_timer_t * timer = NULL;

portMUX_TYPE timerMux = portMUX_INITIALIZER_UNLOCKED;

void IRAM_ATTR onTimer() {
  static boolean ledState = LOW;
  digitalWrite(ledPin, ledState);
  ledState = !ledState;
}

void setup() {
  pinMode(ledPin, OUTPUT);
  timer = timerBegin(0, 80, true); // Timer 0, Teiler 80 (1 MHz clock), count up
  timerAttachInterrupt(timer, &onTimer, true);
  timerAlarmWrite(timer, 1000000, true); // 1 Sekunde (in Mikrosekunden)
  timerAlarmEnable(timer);
}

void loop() {
  // Nichts zu tun hier, der Timer kümmert sich um das Blinken der LED
}
```