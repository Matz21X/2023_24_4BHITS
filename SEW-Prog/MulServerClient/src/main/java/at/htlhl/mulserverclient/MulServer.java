package at.htlhl.mulserverclient;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class MulServer {

    public MulServer() throws IOException {

        // BIND the IP address and TCP port number 4711 and
        // LISTEN for incoming data on this address and port
        // (ip address / host is a local one per default)
        ServerSocket server = new ServerSocket(4711);

        while (true) {

            System.out.println("Looking for connection");

            // ACCEPT an incoming client connection
            Socket client = server.accept();

            // prepare in an out streams for read and write
            InputStream in = client.getInputStream();
            OutputStream out = client.getOutputStream();

            int factor1 = in.read();
            int factor2 = in.read();

            int result = factor1 * factor2;

            // WRITE data (result of multiplication)
            out.write(result);

            // CLOSE the socket connection to the client
            client.close();
        }

    }

    public static void main(String[] args) {
        try {
            new MulServer();
        } catch (IOException e) {
            System.err.println("A problem with the server occurred: " + e.getMessage());
        }
    }
}
