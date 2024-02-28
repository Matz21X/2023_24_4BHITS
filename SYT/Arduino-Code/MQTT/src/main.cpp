#include <Arduino.h>
#include <DallasTemperature.h>
#include <OneWire.h>
#include <WiFi.h>
#include <WebServer.h>
#include <PubSubClient.h>
 
#define SSID "HTLIoT"
#define WIFI_PW "hollabrunn"
 
#define MQTT_SERVER "broker.hivemq.com"
//#define MQTT_SERVER "test.mosquitto.org"
 
#define MQTT_PORT 1883
//#define TEMPERATURE_TOPIC "DONPOLLO/ohio/temp"
#define TEMPERATURE_TOPIC "HTLHL/4BHITS/temperature"
 
// Webserver
WebServer myWebServer(80);
 
// Temperature
OneWire ow(4);
DallasTemperature ts(&ow);
 
// MQTT
WiFiClient espClient; // for connection
PubSubClient mqttClient(espClient);
float receivedTemp = 0.0;
float localTemp = 0.0;
 
void handleRoot(); // webserver
void callback(char *topic, byte *payload, unsigned int length);
 
void setup() {
  Serial.begin(9600);
 
  // Webserver
  Serial.print("Connecting to ");
  Serial.print(SSID);
  WiFi.begin(SSID, WIFI_PW);
  while (!WiFi.isConnected()) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("OK");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
 
  myWebServer.on("/", handleRoot);
  myWebServer.begin();
 
  // Temperature
  ts.begin();
 
  // MQTT
  mqttClient.setServer(MQTT_SERVER, MQTT_PORT);
  mqttClient.setCallback(callback);
  while (!mqttClient.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (mqttClient.connect("ESP32Client")) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(mqttClient.state());
      Serial.println(" try again in 1 second");
      delay(1000);
    }
  }
  mqttClient.subscribe(TEMPERATURE_TOPIC);
}
 
void loop() {
  myWebServer.handleClient();
 
  mqttClient.loop(); // Process incoming MQTT messages
 
  ts.requestTemperatures();
  float currentTemp = ts.getTempCByIndex(0);
  Serial.print("This Arduino Temperature: ");
  Serial.println(currentTemp);
 
  localTemp = currentTemp;
  String localStr = String(localTemp);
  localStr = "ESP-17;" + localStr;
 
  // Publish current temperature via MQTT
  String tempStr = String(currentTemp);
  tempStr = "ESP-17;" + tempStr;
  mqttClient.publish(TEMPERATURE_TOPIC, tempStr.c_str());
 
  // Fetch and display temperature from the other Arduino
  delay(20000);
}
 
void handleRoot() {
  String html = "<h2>Temperature MQTT</h2>";
  html += "<p>Received Temperature: ";
  html += receivedTemp;
  html += " °C</p>";
  html += "<p>Local Temperature: ";
  html += localTemp;
  html += " °C</p>";
  myWebServer.send(200, "text/html", html);
}
 
void callback(char *topic, byte *payload, unsigned int length) {
  String message = "";
  for (unsigned int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  receivedTemp = message.toFloat();
}