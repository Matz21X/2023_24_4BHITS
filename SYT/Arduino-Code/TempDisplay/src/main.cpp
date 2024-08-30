#include <OneWire.h>
#include <DallasTemperature.h>
#include <Wire.h>
#include <Arduino.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// Pin-Definitionen
#define ONE_WIRE_BUS 14  // Der Pin, an dem der DS18B20 angeschlossen ist
#define SCREEN_WIDTH 128  // Breite des OLED-Displays in Pixeln
#define SCREEN_HEIGHT 64  // Höhe des OLED-Displays in Pixeln

// Instanz für OneWire
OneWire oneWire(ONE_WIRE_BUS);

// Instanz für DallasTemperature
DallasTemperature sensors(&oneWire);

// Instanz für das OLED-Display
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

void setup() {
  // Starten der seriellen Kommunikation
  Serial.begin(9600);

  // Starten der Temperatursensoren
  sensors.begin();

  // Initialisieren des OLED-Displays
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {  // 0x3C ist die I2C-Adresse des Displays
    Serial.println(F("SSD1306 allocation failed"));
    for (;;);  // Endlosschleife
  }

  // Display löschen
  display.clearDisplay();
  display.setTextSize(3);       // Textgröße setzen
  display.setTextColor(SSD1306_WHITE);  // Textfarbe setzen
  display.setCursor(0, 0);      // Startposition für den Text
  display.print("Initializing...");
  display.display();
  delay(2000);  // Kurze Pause zum Anzeigen der Nachricht
}

void loop() {
  // Temperaturmessung anfordern
  sensors.requestTemperatures();
  
  // Temperatur auslesen (hier wird der erste gefundene Sensor genommen)
  float temperatureC = sensors.getTempCByIndex(0);
  
  // Anzeige auf dem OLED-Display
  display.clearDisplay();
  display.setCursor(0, 0);
  display.print("");
  display.print(temperatureC);
  display.println("  ");
  
  // Aktualisieren des Displays
  display.display();

  // Seriell ausgeben (optional)
  Serial.print("Temperature: ");
  Serial.print(temperatureC);
  Serial.println(" C");
  
  // Kurze Verzögerung
  delay(1000);
}
