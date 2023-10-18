package at.htlhl.mulserverclient;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;

public class MulClient {

    public MulClient() throws IOException {

        // Create a SOCKET connection to the specified server
        Socket server = new Socket("localhost", 4711);


        // prepare in and out streams for read and write
        InputStream in = server.getInputStream();
        OutputStream out = server.getOutputStream();

        // WRITE data (factors)
        out.write(4);
        out.write(9);

        int result = in.read();
        System.out.println("Result of multiplication: " + result);

        // CLOSE the socket connection to the server
        server.close();

    }

    public static void main(String[] args) {
        try {
            new MulClient();
        } catch (IOException e){
            System.err.println("The Client has a problem: " + e.getMessage());
        }
    }
}
