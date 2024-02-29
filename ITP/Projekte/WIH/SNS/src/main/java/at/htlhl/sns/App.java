package at.htlhl.sns;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class App implements MqttCallback {
    MqttClient client;


    public App() {
    }

    public static void main(String[] args) {
        new App().doDemo();
    }

    public void doDemo() {

        String myTopic = "v3/";
        myTopic += username;
        myTopic += ("/devices/" + devId + "/down/push”);
        List sList = new ArrayList();
        JSONObject jsonmsg = new JSONObject();
        JSONObject jdownlinks = new JSONObject();
        jdownlinks.put("f_port”, 1);
        jdownlinks.put("frm_payload”, Base64.getEncoder().encodeToString(payload));
        jdownlinks.put("priority”, "NORMAL");
        sList.add(jdownlinks);
        jsonmsg.put("downlinks”,sList);
        System.out.print("sendDownlink ");
        System.out.println(jsonmsg);
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
            client.publish("#", "112".getBytes(), 0, false);
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