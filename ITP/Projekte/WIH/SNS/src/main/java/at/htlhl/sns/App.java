package at.htlhl.sns;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

public class App implements MqttCallback {
    MqttClient client;


    public App() {
    }

    public static void main(String[] args) throws JSONException {
        new App().doDemo();
    }

    public void doDemo() throws JSONException {

        String myTopic = "v3/";
        myTopic += "itp-project-2@ttn";
        myTopic += ("/devices/" + "uno-0004a30b001bcc84" + "/down/push");
        byte[] payload = {9};
        List sList = new ArrayList();
        JSONObject jsonmsg = new JSONObject();
        JSONObject jdownlinks = new JSONObject();
        jdownlinks.put("f_port", 1);
        jdownlinks.put("frm_payload", Base64.getEncoder().encodeToString(payload));
        jdownlinks.put("priority", "NORMAL");
        sList.add(jdownlinks);
        jsonmsg.put("downlinks",sList);
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

            client.publish(myTopic, jsonmsg.toString().getBytes("utf-8"), 0, false);



        } catch (MqttException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
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