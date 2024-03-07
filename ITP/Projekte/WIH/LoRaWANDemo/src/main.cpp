#include <Arduino.h>
#include <TheThingsMessage.h>

#define debugSerial Serial
#define loraSerial Serial1
#define freqPlan TTN_FP_EU868

const int digitalPin = 2;
const int ledPin = 13;

void message(const uint8_t *payload, size_t size, port_t port);
void led(const uint8_t *payload);

const char *appEui = "0000000000000000";
const char *appKey = "1454124B034A6A582A0F0566075792A0";

TheThingsNetwork ttn(loraSerial, debugSerial, freqPlan);

void setup() {
  pinMode(digitalPin, INPUT);
  pinMode(LED_BUILTIN, OUTPUT);

  loraSerial.begin(57600);
  debugSerial.begin(9600);

  while (not debugSerial) {}

  debugSerial.println("-- STATUS");
  ttn.showStatus();

  debugSerial.println("-- JOIN TTN Application");
  ttn.join(appEui,appKey);

  // register callback function  
  ttn.onMessage(message);
}


void loop() {
  if (digitalRead(digitalPin) == 1) {
    // send Notfall message
    byte data[2];
    data[0] = 0x11;
    data[1] = 0x4e;

    ttn.sendBytes(data, sizeof(data));
  } else if (digitalRead(digitalPin) == 0) {
    // send Ok message
    byte data[2];
    data[0] = 0x11;
    data[1] = 0x4F;

    ttn.sendBytes(data, sizeof(data));
  }
}

void message(const uint8_t *payload, size_t size, port_t port) {
  debugSerial.println("-- MESSAGE received: ");
  for(int i = 0; i < size; i++) {
    debugSerial.print(payload[i]);
    debugSerial.print(" ");
  }
  debugSerial.println();
  led(payload);
}

void led(const uint8_t *payload) {
  if (payload[1] == 1) {
    digitalWrite(LED_BUILTIN, HIGH); 
  } else {
    digitalWrite(LED_BUILTIN, LOW);
  }
}