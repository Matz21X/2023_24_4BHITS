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
