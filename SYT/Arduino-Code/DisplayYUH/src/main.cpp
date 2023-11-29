#include <Arduino.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

Adafruit_SSD1306 dp( 124, 64, &Wire, -1 );

void setup() {
  dp.begin( SSD1306_SWITCHCAPVCC, 0x3C );
  dp.clearDisplay();
  dp.setTextColor(SSD1306_WHITE);
  dp.drawCircle(10, 10, 10, WHITE);
  dp.write("Bruh");
  dp.display();
}

void loop() {

}