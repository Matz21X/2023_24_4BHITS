package com.example.gitfx;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class CombineProcessOutputs {
    public static void main(String[] args) {
        List<String> combinedOutput = new ArrayList<>();

        try {
            // Befehle, die Sie ausführen möchten
            String command1 = "echo 'Hello from Command 1'";
            String command2 = "echo 'Hello from Command 2'";
            String command3 = "echo 'Hello from Command 3'";

            ProcessBuilder processBuilder1 = new ProcessBuilder("bash", "-c", command1);
            ProcessBuilder processBuilder2 = new ProcessBuilder("bash", "-c", command2);
            ProcessBuilder processBuilder3 = new ProcessBuilder("bash", "-c", command3);

            Process process1 = processBuilder1.start();
            Process process2 = processBuilder2.start();
            Process process3 = processBuilder3.start();

            combinedOutput.addAll(readOutput(process1));
            combinedOutput.addAll(readOutput(process2));
            combinedOutput.addAll(readOutput(process3));

            // Ausgabe kombinieren
            for (String line : combinedOutput) {
                System.out.println(line);
            }

            int exitCode1 = process1.waitFor();
            int exitCode2 = process2.waitFor();
            int exitCode3 = process3.waitFor();

            if (exitCode1 == 0 && exitCode2 == 0 && exitCode3 == 0) {
                System.out.println("Kommandos erfolgreich ausgeführt!");
            } else {
                System.out.println("Fehler beim Ausführen der Kommandos.");
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    static List<String> readOutput(Process process) {
        List<String> outputLines = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                outputLines.add(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return outputLines;
    }
}
