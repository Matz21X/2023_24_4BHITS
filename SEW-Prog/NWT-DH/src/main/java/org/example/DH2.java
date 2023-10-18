package org.example;

public class DH2 {
    public static void main(String[] args) {
        int p = 28151;
        int spe = findSpe(p);
        System.out.println("Das kleinste primitive Element von Fp mit p = " + p + " ist: " + spe);
    }

    public static int findSpe(int p) {
        for (int g = 2; g < p; g++) {
            if (isPrimitiveElement(g, p)) {
                return g;
            }
        }
        return -1; 
    }

    public static boolean isPrimitiveElement(int g, int p) {
        boolean[] usedPowers = new boolean[p]; 
        int power = 1;

        for (int i = 0; i < p - 2; i++) { 
            power = (power * g) % p;
            if (usedPowers[power]) {
                return false; 
            }
            usedPowers[power] = true;
        }

        return true; 
    }
}

