#include <WiFi.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <PubSubClient.h>

// Netzwerk-Informationen
const char* ssid = "HTLIoT";
const char* password = "hollabrunn";

// MQTT Broker-Informationen
const char* mqtt_server = "broker.hivemq.com";
const int mqtt_port = 1883;
const char* mqtt_topic = "DONPOLLO/ohio/temp";

// OneWire und DallasTemperature Setup
#define ONE_WIRE_BUS 4  // GPIO-Pin für OneWire
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

// WiFi und MQTT Clients
WiFiClient espClient;
PubSubClient client(espClient);

// Funktion zum Verbinden mit WiFi
void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Verbinden mit ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi verbunden");
  Serial.print("IP-Adresse: ");
  Serial.println(WiFi.localIP());
}

// Funktion zum Verbinden mit MQTT Broker
void reconnect() {
  while (!client.connected()) {
    Serial.print("Verbinden mit MQTT Broker...");
    if (client.connect("ESP32Client")) {
      Serial.println("verbunden");
    } else {
      Serial.print("Fehler, rc=");
      Serial.print(client.state());
      Serial.println(" erneuter Versuch in 5 Sekunden");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  sensors.begin();
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  sensors.requestTemperatures();
  float temperatureC = sensors.getTempCByIndex(0);

  Serial.print("Temperatur: ");
  Serial.println(temperatureC);
  
  char tempString[8];
  dtostrf(temperatureC, 1, 2, tempString);

  client.publish(mqtt_topic, tempString);
  
  delay(5000);  // Wartezeit zwischen den Messungen
}
