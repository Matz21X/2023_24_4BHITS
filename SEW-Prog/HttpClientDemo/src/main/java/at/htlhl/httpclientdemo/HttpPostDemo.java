package at.htlhl.httpclientdemo;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class HttpPostDemo {

    // Constants --------------------------------------------------------------

    public static final String PRODUCT_POST_URI = "https://fruitshop2-predic8.azurewebsites.net/shop/v2/products";

    // Instance creation ------------------------------------------------------

    public HttpPostDemo() {

        String productJsonString = """
                {
                    "name": "Muskattraube",
                    "price": 4.50
                }
                """;

        /*
         * HTTP POST Request erzeugen
         */
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI(PRODUCT_POST_URI))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(productJsonString))
                    .build();

            // Den erzeugten HTTP-Request senden
            HttpClient httpClient = HttpClient.newHttpClient();
            HttpResponse<String> response = httpClient.send(
                    request, HttpResponse.BodyHandlers.ofString());

            // Die Antwort verarbeiten
             if (response.statusCode() == HttpURLConnection.HTTP_CREATED){
                 System.out.println("Response Body: \n"+ response.body());
             } else {
                 System.err.println("Problem, StatusCode: "+ response.statusCode());
             }


        } catch (URISyntaxException ex){
            System.err.println("URISyntaxException: "+ ex.getMessage());
            System.err.println("Program will exit...");
            System.exit(1);
        } catch (IOException ex) {
            System.err.println("URISyntaxException: "+ ex.getMessage());
            System.err.println("Program will exit...");
            System.exit(1);
        } catch (InterruptedException ex) {
            System.err.println("URISyntaxException: "+ ex.getMessage());
            System.err.println("Program will exit...");
            System.exit(1);
        }


    }

    public static void main(String[] args) {
        new HttpPostDemo();
    }
}
