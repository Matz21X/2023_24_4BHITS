# MQTT
#SYT #FIMI

## Basics

- **MQTT**: Message Queuing Telemetry Transport
- **Protocol Type**: Publish-Subscribe messaging protocol
- **Lightweight**: Designed for constrained devices and low bandwidth situations
- **Connection-Oriented**: Works on top of TCP/IP

## Components

- **Broker**: Central server handling message distribution
- **Client**: Devices or applications communicating through MQTT
- **Topic**: Logical channel for message distribution
- **Message**: Data packets sent over MQTT

## QoS Levels

- **QoS 0 (At most once)**: Message delivered zero or more times
- **QoS 1 (At least once)**: Message delivered at least once
- **QoS 2 (Exactly once)**: Message delivered exactly once

## Commands

- **Connect**: Establish connection with the broker
- **Publish**: Send a message to a specific topic
- **Subscribe**: Subscribe to one or more topics to receive messages
- **Unsubscribe**: Stop receiving messages from specific topics
- **Disconnect**: Gracefully terminate the connection

## Topic Structure
- **Hierarchical**: Uses forward slashes (/) to denote levels (e.g., "home/livingroom/temperature")
- **Wildcard**: Allows subscribing to multiple topics using wildcards (+ for single level, # for multi-level)

## Example
```mqtt
CONNECT
PUBLISH topic: "sensors/temperature" message: "25C" QoS: 1
SUBSCRIBE topic: "sensors/#" QoS: 0
```

## Security

- **Authentication**: Username/password or certificate-based
- **Encryption**: TLS/SSL for secure communication

## Implementations

- **Mosquitto**: Open-source MQTT broker
- **Paho**: MQTT client libraries for various programming languages
- **HiveMQ**: Enterprise-grade MQTT broker

## Use Cases

- **IoT**: Remote monitoring, control, and data exchange in IoT applications
- **Messaging**: Real-time messaging in applications like chat systems
- **Telemetry**: Collecting and analyzing data from distributed sensors

## Best Practices

- **Keepalive Mechanism**: Set appropriate keepalive interval to maintain connections
- **QoS Selection**: Choose the appropriate QoS level based on message importance
- **Error Handling**: Implement robust error handling for connection disruptions
- **Security Measures**: Secure MQTT communication with authentication and encryption
- **Topic Design**: Design a clear and organized topic hierarchy for efficient message routing

## Resources

- [MQTT.org](http://mqtt.org/)
- Eclipse Paho
- [HiveMQ](https://www.hivemq.com/)


## Commands

```powershell
# Erstellen & Listen
PS C:\Users\matth> .\mosquitto_sub.exe -h broker.hivemq.com -p 1883 -t DONPOLLO/ohio/temp   

# Posten
PS C:\Users\matth> .\mosquitto_pub.exe -h broker.hivemq.com -p 1883 -t DONPOLLO/ohio/temp -m "YUH"
```