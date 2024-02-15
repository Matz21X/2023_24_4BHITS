#include <Arduino.h>
#include <TheThingsNetwork.h>

#define loraSerial Serial1
#define debugSerial Serial
#define freqPlan TTN_FP_EU868

TheThingsNetwork ttn(loraSerial, debugSerial, freqPlan);


void setup() {
  debugSerial.begin(9600);
  loraSerial.begin(57600);

  while (!debugSerial) {}

  debugSerial.println("-- STATUS");
  ttn.showStatus();

}

void loop() {
  // put your main code here, to run repeatedly:
}
