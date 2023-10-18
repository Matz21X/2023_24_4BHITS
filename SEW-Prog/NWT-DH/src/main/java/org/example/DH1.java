package org.example;

public class DH1 {
    public static void main(String[] args) {

        boolean nDone = true;
        int d = 0;

        do {
            if (((209 * d) % 991) == 1) {
                System.out.println("SUCCESS");
                System.out.println("Number: " + d);
                nDone = false;
            } else {
                d++;
                System.out.println(d);
            }
        } while (nDone);


    }
}