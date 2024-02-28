#include <Arduino.h>
#include <TheThingsNetwork.h>

#define loraSerial Serial1
#define debugSerial Serial
#define freqPlan TTN_FP_EU868

TheThingsNetwork ttn(loraSerial, debugSerial, freqPlan);

// Set your AppEUI and AppKey
const char *appEui = "0000000000000000";
const char *appKey = "1454124B034A6A582A0F0566075792A0";

// Set the desired port number
const port_t myPort = 1;

// put function declarations here:
void message(const uint8_t *payload, size_t size, port_t port );

void setup() {
  debugSerial.begin(9600);
  loraSerial.begin(57600);

  while (!debugSerial) {}

  debugSerial.println("-- STATUS");
  ttn.showStatus();

  debugSerial.println("-- JOIN");
  ttn.join(appEui, appKey);

  // Set callback for incoming messages
  ttn.onMessage(message);
}

void loop() {
  debugSerial.println("-- SEND DATA");

  // Prepare array of 1 byte to indicate LED status
  byte data[2];
  data[0] = 0x01;
  data[1] = 0xAB;

  // Send it off with the specified port
  ttn.sendBytes(data, sizeof(data), myPort);

  delay(10000);
}

void message(const uint8_t *payload, size_t size, port_t port ){
  debugSerial.print("-- MESSAGE RECEIVED on port ");
  debugSerial.print(port);
  debugSerial.print(": ");
  for (unsigned int i = 0; i < size; i++)
  {
    debugSerial.print(payload[i], HEX); // Print payload as hexadecimal
    debugSerial.print(" ");
  }
  debugSerial.println();
}
