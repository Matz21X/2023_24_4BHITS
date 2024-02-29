package at.htlhl.sns;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.internal.wire.MqttPublish;

public class App implements MqttCallback {
    MqttClient client;


    public App() {
    }

    public static void main(String[] args) {
        new App().doDemo();
    }

    public void doDemo() {
        try {
            String username = "itp-project-2@ttn";
            String password = "NNSXS.H6J4LIWM7SUADHQGWEK5SJED6T5742OAZWUFZZI.RJZB43B3LI4J6WZFZLCYBQU4LQFUIATFNZYQROQWCEH6BWG2ALSA";
            String serverurl = "tcp://eu1.cloud.thethings.network:1883";
            String clientId = MqttClient.generateClientId();

            MqttConnectOptions options = new MqttConnectOptions();
            options.setCleanSession(true);
            options.setUserName(username);
            options.setPassword(password.toCharArray());

            client = new MqttClient(serverurl, clientId, null);
            client.connect(options);

            client.setCallback(this);
            client.subscribe("#");
            sendMessage("topic", "Hallo Konrad");
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }


    @Override
    public void connectionLost(Throwable cause) {
        //TODO Auto -generated method stub

    }

    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
        System.out.println(message);
    }

    @Override
    public void deliveryComplete(IMqttDeliveryToken token) {

        // TODO Auto -generated method stub

    }

    public void sendMessage(String topic, String payload) {
        try {
            MqttMessage message = new MqttMessage(payload.getBytes());
            client.publish(topic, message);
            System.out.println("Message published: " + payload);
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }
}