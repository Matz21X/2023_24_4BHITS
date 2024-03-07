#include <Arduino.h>
#include <TheThingsMessage.h>

#define loraSerial Serial1
#define debugSerial Serial

#define CLIENTID d05372d36dab4c00b41a76c8a2aee2fb

#define freqPlan TTN_FP_EU868

const int digitalPin = 2;
const int ledPin = 13;

void message(const uint8_t *payload, size_t size, port_t port);
void led(const uint8_t *payload);

const char *appEui = "0000000000000000";
const char *appKey = "FE2A36A86EA525DE92B29D9B284D0635";

TheThingsNetwork ttn(loraSerial, debugSerial, freqPlan);

void setup() {
  // Setup pins in Input or output mode
  pinMode(digitalPin, INPUT);
  pinMode(LED_BUILTIN, OUTPUT);

  loraSerial.begin(57600);
  debugSerial.begin(9600);

  while (not debugSerial) {}

  debugSerial.println("-- STATUS");
  ttn.showStatus();

  debugSerial.println("-- JOIN TTN Application");
  ttn.join(appEui,appKey);

  // check for messages  
  ttn.onMessage(message);
}


void loop() {
  if (digitalRead(digitalPin) == 1) {
    // send "Notfall" to ttn mqtt server
    byte data[2];
    data[0] = 0x11;
    data[1] = 0x4e;

    ttn.sendBytes(data, sizeof(data));
  } else if (digitalRead(digitalPin) == 0) {
    // send "OK" to ttn mqtt server
    byte data[2];
    data[0] = 0x11;
    data[1] = 0x4F;

    ttn.sendBytes(data, sizeof(data));
  }
}

void message(const uint8_t *payload, size_t size, port_t port) {
  debugSerial.print("-- MESSAGE received: ");
  for(int i = 0; i < size; i++) {
    // print out payload
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
    // stop led from blinking or being lit
    digitalWrite(LED_BUILTIN, LOW);
  }
}