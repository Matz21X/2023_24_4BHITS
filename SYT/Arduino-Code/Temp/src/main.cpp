#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>
#include <DallasTemperature.h>
#include <OneWire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

OneWire ow(4);
DallasTemperature ts(&ow);
Adafruit_SSD1306 dp(124, 64, &Wire, -1);

#define SSID "HTLIoT"
#define WIFI_PW "hollabrunn"

float currentTemp; // Globale Variable für die Temperatur

WebServer myWebServer(80);

void handleRoot()
{
  ts.requestTemperatures();
  currentTemp = ts.getTempCByIndex(0);
  String tempString = String(currentTemp);
  String html = "<html><body><h1>Temperatur: <span id='temp'>" + tempString + "</span> &deg;C</h1><script>setTimeout(updateTemperature, 1000);function updateTemperature(){var xhttp = new XMLHttpRequest(); xhttp.onreadystatechange = function() {if (this.readyState == 4 && this.status == 200) {document.getElementById('temp').innerHTML = this.responseText;}}; xhttp.open('GET', '/temperature', true); xhttp.send();}</script></body></html>";
  myWebServer.send(200, "text/html", html);
}

void handleTemperature()
{
  ts.requestTemperatures();
  currentTemp = ts.getTempCByIndex(0);
  String tempString = String(currentTemp);
  myWebServer.send(200, "text/plain", tempString);
}

void setup()
{
  Serial.begin(9600);
  Serial.print("Connecting to ");
  Serial.print(SSID);
  WiFi.begin(SSID, WIFI_PW);
  while (!WiFi.isConnected())
  {
    Serial.print(".");
    delay(500);
  }
  Serial.println("OK");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
  myWebServer.on("/", handleRoot);
  myWebServer.on("/temperature", HTTP_GET, handleTemperature);
  myWebServer.begin();
  dp.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  dp.clearDisplay();
  dp.setTextColor(SSD1306_WHITE);
  dp.setTextSize(2);
  dp.setCursor(0, 0);
  dp.display();
  ts.begin();
}

void loop()
{
  myWebServer.handleClient();
  dp.clearDisplay();
  dp.setCursor(20, 8);
  dp.println(currentTemp);
  dp.display();
  // delay(1000); // Kurze Verzögerung für die Aktualisierung der Anzeige
}
