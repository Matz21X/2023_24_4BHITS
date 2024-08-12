#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>

const char* ssid = "imhnew";         // Ersetze mit deinem WLAN-SSID
const char* password = "LckpOYfPnbhMG1QDf4YI"; // Ersetze mit deinem WLAN-Passwort

const char* serverUrl = "http://192.168.132.99/status/powerflow";

void setup() {
  Serial.begin(9600);
  pinMode(D0, OUTPUT);
  delay(10);

  // Verbindung zum WLAN herstellen
  Serial.println();
  Serial.println();
  Serial.print("Verbinde mit ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  int i = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(++i); Serial.print(' ');
    int x = i%2;
    if (x!=0) {
      digitalWrite(D0, HIGH);
        } else {
      digitalWrite(D0, LOW);
    }
  }

  Serial.println("");
  Serial.println("WLAN verbunden");
  Serial.println("IP Adresse: ");
  Serial.println(WiFi.localIP());
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
          return;
        }

        // Spezifische Werte anzeigen
        float P_Akku = doc["site"]["P_Akku"];
        float P_Grid = doc["site"]["P_Grid"];
        float P_Load = doc["site"]["P_Load"];
        float P_PV = doc["site"]["P_PV"];
        String Date = doc["common"]["datestamp"];
        String Time = doc["common"]["timestamp"];

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

        if (P_Load < -1000)
        {
          digitalWrite(D0, LOW);
        } else {
          digitalWrite(D0, HIGH);
        }
        
      }
    } else {
      Serial.printf("Fehler bei HTTP Anfrage: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();
  } else {
    Serial.println("WLAN nicht verbunden");
  }

  delay(5000); // Warte 10 Sekunden vor dem nächsten Abruf
}
