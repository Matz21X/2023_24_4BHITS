#include <Arduino.h>
#include <DallasTemperature.h>
#include <OneWire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

OneWire ow( 4 );
DallasTemperature ts( &ow );
Adafruit_SSD1306 dp( 124, 64, &Wire, -1 );

void setup() {
  Serial.begin(9600);
  dp.begin( SSD1306_SWITCHCAPVCC, 0x3C );
  dp.clearDisplay();
  dp.setTextColor(SSD1306_WHITE);
  dp.setTextSize(2);  // Ändere die Textgröße nach Bedarf
  dp.setCursor(0, 0);
  dp.display();
  ts.begin( );
}

void loop() {
  ts.requestTemperatures( );
  float currentTemp = ts.getTempCByIndex(0);  
  Serial.print(currentTemp);
  Serial.println("ºC");
  dp.clearDisplay();
  dp.setCursor(20, 8);
  dp.println(currentTemp);
  dp.display();
  delay(500);
}

