#include <Arduino.h>
#include <DallasTemperature.h>
#include <OneWire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Wifi.h>
#include <WebServer.h>

const char *ssid = "HTLIot";
const char *password = "hollabrunn";

OneWire ow(4);
DallasTemperature ts(&ow);
Adafruit_SSD1306 dp(124, 64, &Wire, -1);
WebServer server( 80 );

void setup()
{
  Serial.begin(9600);
  dp.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  dp.clearDisplay();
  dp.setTextColor(SSD1306_WHITE);
  dp.setTextSize(2);
  dp.setCursor(0, 0);
  dp.display();
  ts.begin();
  setupWiFi();
  server.on("/", HTTP_GET, handleRoot);
}

void loop()
{
  server.handleClient();
  ts.requestTemperatures();
  float currentTemp = ts.getTempCByIndex(0);
  Serial.print(currentTemp);
  Serial.println("ºC");
  dp.clearDisplay();
  dp.setCursor(20, 8);
  dp.println(currentTemp);
  dp.display();
  delay(1000); // Füge eine kurze Verzögerung hinzu, um die Aktualisierungsrate zu steuern
}

void setupWiFi()
{
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi: " + WiFi.localIP());
}

void handleRoot()
{
  String tempString = String(ts.getTempCByIndex(0));
  String html = "<html><body><h1>Temperatur: " + tempString + " &deg;C</h1></body></html>";
  server.send(200, "text/html", html);
}
