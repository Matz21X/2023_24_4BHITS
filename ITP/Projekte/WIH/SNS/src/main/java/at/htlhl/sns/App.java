package at.htlhl.sns;

import org.json.JSONObject;
import org.thethingsnetwork.data.common.Connection;
import org.thethingsnetwork.data.mqtt.Client;

import java.net.URISyntaxException;

public class App {

    String region = "eu";
    String appId = "hello-world";
    String accessKey = "2Z+MU0T5xZCaqsD0bPqOhzA6iygGFoi4FAgMFgBfXSo=";

    Client client;

    {
        try {
            client = new Client(region, appId, accessKey);
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }


    client.start();

}
