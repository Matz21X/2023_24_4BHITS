#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

const char* ssid = "imhnew";         // Ersetze mit deinem WLAN-SSID
const char* password = "LckpOYfPnbhMG1QDf4YI"; // Ersetze mit deinem WLAN-Passwort

const char* serverUrl = "http://192.168.132.99/status/powerflow";

#define SCREEN_WIDTH 128  // Breite des OLED-Displays in Pixeln
#define SCREEN_HEIGHT 64  // Höhe des OLED-Displays in Pixeln
#define OLED_RESET    -1  // Reset-Pin (nicht benötigt für dieses Display)

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

void setup() {
  Serial.begin(9600);
  pinMode(D0, OUTPUT);
  delay(10);

  // Initialisiere das OLED-Display
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("SSD1306 allocation failed"));
    for (;;);
  }
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);

  // Verbindung zum WLAN herstellen
  Serial.println();
  Serial.println();
  Serial.print("Verbinde mit ");
  Serial.println(ssid);
  display.clearDisplay();
  display.setCursor(0, 0);
  display.println("Verbinde mit WLAN...");
  display.display();

  WiFi.begin(ssid, password);

  int i = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(++i); Serial.print(' ');
    int x = i % 2;
    if (x != 0) {
      digitalWrite(D0, HIGH);
    } else {
      digitalWrite(D0, LOW);
    }
  }

  Serial.println("");
  Serial.println("WLAN verbunden");
  Serial.println("IP Adresse: ");
  Serial.println(WiFi.localIP());

  display.clearDisplay();
  display.setCursor(0, 0);
  display.println("WLAN verbunden!");
  display.print("IP: ");
  display.println(WiFi.localIP());
  display.display();
  delay(2000);
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;
    http.begin(client, serverUrl);

    int httpCode = http.GET();

    if (httpCode > 0) {
      if (httpCode == HTTP_CODE_OK) {
        String payload = http.getString();
        Serial.println("Antwort erhalten:");

        // JSON-Daten parsen
        StaticJsonDocument<2048> doc;
        DeserializationError error = deserializeJson(doc, payload);

        if (error) {
          Serial.print("Fehler beim Parsen der JSON-Daten: ");
          Serial.println(error.c_str());
          
          display.clearDisplay();
          display.setCursor(0, 0);
          display.print("JSON Parsing Error:");
          display.println(error.c_str());
          display.display();
          return;
        }

        // Spezifische Werte anzeigen
        float P_Akku = doc["site"]["P_Akku"];
        float P_Grid = doc["site"]["P_Grid"];
        float P_Load = doc["site"]["P_Load"];
        float P_PV = doc["site"]["P_PV"];
        String Date = doc["common"]["datestamp"];
        String Time = doc["common"]["timestamp"];

        // Anzeige auf dem OLED-Display
        display.clearDisplay();
        display.setCursor(0, 0);
        display.print("P_Akku: ");
        display.println(P_Akku);
        display.print("P_Grid: ");
        display.println(P_Grid);
        display.print("P_Load: ");
        display.println(P_Load);
        display.print("P_PV: ");
        display.println(P_PV);
        display.display();

        // Seriell ausgeben (optional)
        Serial.print(Date);
        Serial.print(" | ");
        Serial.println(Time);
        Serial.print("P_Akku: ");
        Serial.println(P_Akku);
        Serial.print("P_Grid: ");
        Serial.println(P_Grid);
        Serial.print("P_Load: ");
        Serial.println(P_Load);
        Serial.print("P_PV: ");
        Serial.println(P_PV);
        Serial.println(" ");

        if (P_Load < -1000) {
          digitalWrite(D0, LOW);
        } else {
          digitalWrite(D0, HIGH);
        }

      }
    } else {
      Serial.printf("Fehler bei HTTP Anfrage: %s\n", http.errorToString(httpCode).c_str());
      
      display.clearDisplay();
      display.setCursor(0, 0);
      display.println("HTTP Request Failed");
      display.print("Error: ");
      display.println(http.errorToString(httpCode).c_str());
      display.display();
    }

    http.end();
  } else {
    Serial.println("WLAN nicht verbunden");
    
    display.clearDisplay();
    display.setCursor(0, 0);
    display.println("WLAN nicht verbunden");
    display.display();
  }

  delay(5000); // Warte 5 Sekunden vor dem nächsten Abruf
}
