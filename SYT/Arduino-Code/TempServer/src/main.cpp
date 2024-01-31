#include <WiFi.h>
#include <WebServer.h>
#include <DallasTemperature.h>
#include <OneWire.h>

OneWire ow( 4 );
DallasTemperature ts( &ow );
const char* ssid = "HTLIoT";
const char* password = "hollabrunn";

WebServer server(80);

void setup() {
  Serial.begin(9600);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Verbindung zum WiFi wird hergestellt...");
  }
  Serial.println("Verbunden mit dem WiFi");
  Serial.println(WiFi.localIP());

  server.on("/", HTTP_GET, handleRoot);

  server.begin();
}

void loop() {
  server.handleClient();
  // Ihr Code hier
}

float getTemperatureFromBoard1() {
  // Code für die Temperaturmessung von Board 1 hier einfügen
  ts.requestTemperatures( );
  float currentTemp = ts.getTempCByIndex(0);  
  return currentTemp;
}

float getTemperatureFromBoard2() {
  float temperature = requestTemperatureFromBoard2();
  return temperature;
}

float requestTemperatureFromBoard2() {
  WiFiClient client;
  if (client.connect("IP-des-zweiten-ESP32", 80)) {
    client.print("GET / HTTP/1.1\r\nHost: IP-des-zweiten-ESP32\r\nConnection: close\r\n\r\n");
    delay(500); // Warten auf die Antwort
    String payload = client.readStringUntil('\r');
    client.stop();
    return payload.toFloat();
  } else {
    Serial.println("Fehler beim Verbinden mit Board 2");
    return -1.0; // Fehlerwert
  }
}

void handleRoot() {
  float tempBoard1 = getTemperatureFromBoard1();
  float tempBoard2 = getTemperatureFromBoard2();

  String tempData = "Temperatur von Board 1: " + String(tempBoard1) + "°C\n";
  tempData += "Temperatur von Board 2: " + String(tempBoard2) + "°C";

  server.send(200, "text/plain", tempData);
}
