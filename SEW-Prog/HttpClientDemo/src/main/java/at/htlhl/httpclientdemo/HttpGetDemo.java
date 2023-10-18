package at.htlhl.httpclientdemo;

import at.htlhl.httpclientdemo.model.Product;
import at.htlhl.httpclientdemo.model.Products;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Iterator;

/**
 * Demonstriert wie ein GET-Request abgesetzt wird
 *
 * @author Matthias Hrbek
 * @version 2023-09-27
 */

public class HttpGetDemo {

    // Fields -----------------------------------------------------------------

    private ObjectMapper jsonMapper = new ObjectMapper();


    // Constants --------------------------------------------------------------

    public static final String REQUEST_URL = "https://fruitshop2-predic8.azurewebsites.net/shop/v2/products";

    // Instance creation ------------------------------------------------------

    public HttpGetDemo() {

        try {

            /**
             * HTTP GET-Request erzeugen
             */
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI(REQUEST_URL))
                    .header("Content-Type", "application/json")
                    .GET()
                    .build();

            /**
             * Den erzeugten HTTP-Request mit HttpClient senden
             * (Die Rückmeldung wird in 'response' vom Typ HttpResponse gespeichert
             */

            HttpClient httpClient = HttpClient.newHttpClient();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            /**
             * Die Rückmeldung verarbeiten: Status Code ok?
             * Inhalt verarbeiten (JSON parsen und auf Objekte mappen)
             */
            System.out.println("Status code: " + response.statusCode());
            if (response.statusCode() == HttpURLConnection.HTTP_OK) { //200
                /*
                System.out.println("Response: ");
                //System.out.println(response.body());
                Products products = jsonMapper.readValue(response.body(), Products.class);
                for (Product product : products.getProducts()) {
                    System.out.println(" " + product.toString());
                }
                 */

                // Extract only some fields without building POJOs
                // (e.g. extract onlythe field "self_link" in the products array)
                final JsonNode node = jsonMapper.readTree(response.body());
                if (node.has("products")) {
                    JsonNode products = node.get("products");

                    if (products.isArray()) {
                        ArrayNode arrayNode = (ArrayNode) products;
                        Iterator<JsonNode> iter = arrayNode.elements();

                        while (iter.hasNext()) {
                            JsonNode productNode = iter.next();
                            if (productNode.has("self_link")){
                                System.out.println("self_link: " + productNode.get("self_link"));
                            }
                        }
                    }
                }

            }


        } catch (URISyntaxException ex) {
            System.err.println("URISyntaxException: " + ex.getMessage());
            System.err.println("Program will exit...");
            System.exit(1);
        } catch (IOException ex) {
            System.err.println("URISyntaxException: " + ex.getMessage());
            System.err.println("Program will exit...");
            System.exit(1);
        } catch (InterruptedException ex) {
            System.err.println("URISyntaxException: " + ex.getMessage());
            System.err.println("Program will exit...");
            System.exit(1);
        }

    }


    // Main -------------------------------------------------------------------

    public static void main(String[] args) {
        new HttpGetDemo();
    }
}