#include <DHT.h>
#include <Adafruit_Sensor.h>

#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

#define DPIN 4        // Pin to connect DHT sensor (GPIO number) D2
#define DTYPE DHT11   // Define DHT 11 or DHT22 sensor type

DHT dht(DPIN, DTYPE);
ESP8266WebServer web(80);

const char* ssid = "imhnew";         // The SSID (name) of the Wi-Fi network you want to connect to
const char* password = "LckpOYfPnbhMG1QDf4YI";                     // The password of the Wi-Fi network

float getTemperature() {
 float tc = dht.readTemperature(false);  // Read temperature in Celsius
 return tc;
}

float getHumidity() {
     float hum = dht.readHumidity();
     return hum;
}

void handleRoot() {
 float temperature = getTemperature();   // Get the temperature in Celsius
 float humidity = getHumidity();

 String html = "<html><head><title>Temperature</title>";
 html += "<style>";
 html += "body { font-family: Arial, sans-serif; text-align: center; padding-top: 50px; }";
 html += "h1 { font-size: 48px; color: #333; }";
 html += "</style>";
 html += "</head><body>";
 html += "<h1>Temperature: " + String(temperature) + " &deg;C</h1>";
 html += "<br>";
 html += "<h1>Humidity: " + String(humidity) + " %</h1>";
 html += "</body></html>";

 web.send(200, "text/html", html);       // Send the response to the client
 IPAddress clientIP = web.client().remoteIP(); // Get the IP address of the connected client
 
 digitalWrite(D0, LOW);
 Serial.println('\n');
 Serial.print(temperature);
 Serial.print("°C | ");
 Serial.print(humidity);
 Serial.print("% | ");
 Serial.print(clientIP.toString());
 delay(100);
 digitalWrite(D0, HIGH);
}

void setup() {
 Serial.begin(9600);         // Start the Serial communication to send messages to the computer
 delay(10);
 Serial.println('\n');
 pinMode(D0, OUTPUT);
 
 WiFi.begin(ssid, password);             // Connect to the network
 Serial.print("Connecting to ");
 Serial.print(ssid); Serial.println(" ...");

 int i = 0;
 while (WiFi.status() != WL_CONNECTED) { // Wait for the Wi-Fi to connect
 delay(1000);
 Serial.print(++i); Serial.print(' ');
 int x = i%2;
 if (x!=0) {
 digitalWrite(D0, HIGH);
      } else {
 digitalWrite(D0, LOW);
      }
 
  }

 Serial.println('\n');
 Serial.println("Connection established!");  
 Serial.print("IP address:\t");
 Serial.println(WiFi.localIP());         // Send the IP address of the ESP8266 to the computer
 digitalWrite(D0, HIGH);

 dht.begin();                            // Initialize DHT sensor

 web.on("/", handleRoot);                // Define the root page handling function
 web.begin();                            // Start the server
 Serial.println("HTTP server started");
}

void loop() {
 web.handleClient();                     // Handle client requests
 delay(500);                             // Wait for 0.5 seconds before next update
}

