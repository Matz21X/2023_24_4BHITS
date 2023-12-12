#include <Arduino.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

Adafruit_SSD1306 dp( 124, 64, &Wire, -1 );

void setup() {
  dp.begin( SSD1306_SWITCHCAPVCC, 0x3C );
  dp.clearDisplay();
  dp.setTextColor(SSD1306_WHITE);
  dp.setTextSize(2);  // Ändere die Textgröße nach Bedarf
  dp.setCursor(0, 0);
  dp.display();

  Serial.begin(9600);
  pinMode(36, ANALOG );
  ledcSetup(0, 144, 8);
  ledcAttachPin( 18, 0 );
}

int getValue(int analogValue) {
  return analogValue / 16;
}

void loop() {
  int sensorValue = analogRead(36);
  int result = getValue(sensorValue);

  Serial.println(result);

  ledcWrite(0, result);

  int prntVal = result * 0.3922;

  String resultString = String(prntVal);

  dp.clearDisplay();

  dp.setCursor(20, 8);

  dp.println(resultString + " %");

  dp.display();

}
