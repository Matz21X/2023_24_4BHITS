package at.htlhl.singletondemo;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.eclipse.paho.client.mqttv3.*;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

import java.util.Scanner;

public class Client {
    String serverURI = "tcp://eu1.cloud.thethings.network:1883";
    String clientId = "TestClientID";

    // Login Data
    String username = "itp-project-2@ttn";
    String password = "NNSXS.25O2IET5XBGRY2YWHSZYOKDKRT45BUBSVWJYXUA.OVABVZW5BJ2OZ5YVPPMOPSVYZ77FD74RILH5VYNG6VHZBTCO364Q";

    // Topic on which to subscribe
    String subTopic = "v3/itp-project-2@ttn/devices/uno-0004a30b001bcc84/up";

    // Topic on which to respond
    String resTopic = "v3/itp-project-2@ttn/devices/uno-0004a30b001bcc84/down/push";

    // Output Strings
    final String notfall = "NOTFALL";

    final String ok = "OK";

    // Reset
    public static final String RESET = "\033[0m";  // Text Reset

    // Regular Colors
    public static final String RED = "\033[0;31m";     // RED
    public static final String GREEN = "\033[0;32m";   // GREEN

    MqttClient client;

    public Client() {
        try {
            client = new MqttClient(serverURI, clientId, new MemoryPersistence());
        } catch (MqttException e) {
            throw new RuntimeException(e);
        }
    }

    public void init() {
        Thread cli = new Thread(() -> {
            Scanner scanner = new Scanner(System.in);
            System.out.println("""
                    Confirm Emergency(LED On): on
                    Cancel Emergency Response(LED Off): off
                    """);
            while (true) {
                switch (scanner.nextLine().toLowerCase().trim()) {
                    case ("on") -> respond(1);
                    case ("off") -> respond(0);
                }
            }
        });
        cli.start();

        MqttConnectOptions options = new MqttConnectOptions();
        options.setUserName(username);
        options.setPassword(password.toCharArray());

        try {
            client.connect(options);
        } catch (MqttException e) {
            throw new RuntimeException(e);
        }

        if (client.isConnected()) {
            System.out.println("CONNECTION ESTABLISHED");
        }

        // Subscribe to a TTN topic (e.g., application's uplink topic)
        try {
            client.subscribe(subTopic);
        } catch (MqttException e) {
            throw new RuntimeException(e);
        }

        // Define a callback for incoming messages
        client.setCallback(new MqttCallback() {
            @Override
            public void connectionLost(Throwable cause) {
                System.out.println("Connection lost: " + cause.getMessage());
                cause.printStackTrace();
            }

            @Override
            public void messageArrived(String topic, MqttMessage message) throws Exception {
                ObjectMapper objectMapper = new ObjectMapper();
                String json = new String((message.getPayload()));
                JsonNode jsonNode = objectMapper.readTree(json);
                String response = (((jsonNode.get("uplink_message")).get("decoded_payload")).get("value")).toPrettyString();
                System.out.println("RESPONSE: " + response);
                if (response.equals("\"notfall\"")) {
                    System.out.println(RED + notfall + RESET);
                } else if (response.equals("\"ok\"")) {
                    System.out.println(GREEN + ok + RESET);
                    respond(0);
                }
            }

            @Override
            public void deliveryComplete(IMqttDeliveryToken token) {
                // Not used in this example
            }
        });
    }

    public void respond(int code) {
        MqttMessage message = new MqttMessage();
        String payload = """
                {
                  "downlinks": [
                    {
                      "decoded_payload": {
                          "app": "senior",
                          "type": "led",
                          "value": ${code}
                      },
                      "f_port": 1,
                      "priority": "NORMAL"
                    }
                  ]
                }
                """;
        payload = payload.replace("${code}", String.valueOf(code));
        message.setPayload(payload.getBytes());
        try {
            client.publish(resTopic, message);
        } catch (MqttException e) {
            throw new RuntimeException(e);
        }
    }

}
