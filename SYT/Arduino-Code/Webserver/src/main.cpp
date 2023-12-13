#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>

#define SSID "HTLIoT"
#define WIFI_PW "hollabrunn"

WebServer myWebServer( 80 );

void handleRoot( ) {
  myWebServer.send( 200, "text/html", "<form action=\"blupp.html\" method=\"POST\"><input name=\"ananas\" type=\"text\"><br><input type=\"submit\"></form>");
}
void handleBlupp( ) {
  Serial.println( myWebServer.arg( "ananas" ) );
  myWebServer.send( 200, "text/html", "<h2>It's still Arthur's birthday!");
}
void setup() {
  Serial.begin( 9600 );
  Serial.print( "Connecting to " );
  Serial.print( SSID );
  WiFi.begin( SSID, WIFI_PW );
  while ( ! WiFi.isConnected( ) ) {
    Serial.print( "." );
    delay( 500 );
  }
  Serial.println( "OK" );
  Serial.print( "IP Address: ");
  Serial.println( WiFi.localIP( ) );
  myWebServer.on( "/", handleRoot );
  myWebServer.on( "/blupp.html", handleBlupp );
  myWebServer.begin();
}
void loop() {
  myWebServer.handleClient( );
  delay( 500 );
}