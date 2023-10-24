package com.example.gitfx;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class MainController {
    @FXML
    private Label welcomeText;

    @FXML
    private Button pullBtn;

    @FXML
    private Button pushBtn;

    @FXML
    private Button testBtn;

    @FXML
    private TextField output;

    @FXML
    protected void onPullButtonClick() {
        try {
            // Befehl, den Sie ausführen möchten
            String gitCommand = "git pull";

            // Erstellen Sie einen Prozess-Builder
            ProcessBuilder processBuilder = new ProcessBuilder();
            processBuilder.command("powershell", "-c", gitCommand);
            processBuilder.directory(new File(App.GIT_DIR));

            // Starten Sie den Prozess
            Process process = processBuilder.start();

            // Lesen Sie die Ausgabe des Prozesses
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                output.appendText(line);
            }

            // Warten, bis der Prozess abgeschlossen ist
            int exitCode = process.waitFor();

            if (exitCode == 0) {
                System.out.println("Git pull erfolgreich!");
            } else {
                System.out.println("Fehler beim Ausführen von Git pull. Exit-Code: " + exitCode);
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    @FXML
    protected void onPushButtonClick() {
        try {
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yy HH:mm:ss");
            List<String> combinedOutput = new ArrayList<>();


            String gitAddCommand = "git add -A";
            String gitCommitCommand = "git commit -m "TESTPUSH""/* + now.format(formatter)*/;
            String gitPushCommand = "git push";

            ProcessBuilder gAdd = new ProcessBuilder("powershell", "-c", gitAddCommand);
            ProcessBuilder gCom = new ProcessBuilder("powershell", "-c", gitCommitCommand);
            ProcessBuilder gPus = new ProcessBuilder("powershell", "-c", gitPushCommand);
            gAdd.directory(new File(App.GIT_DIR));
            gCom.directory(new File(App.GIT_DIR));
            gPus.directory(new File(App.GIT_DIR));


            Process gAddP = gAdd.start();
            Process gComP = gCom.start();
            //Process gPusP = gPus.start();

            combinedOutput.addAll(readOutput(gAddP));
            combinedOutput.addAll(readOutput(gComP));
            //combinedOutput.addAll(readOutput(gPusP));

            for (String line : combinedOutput) {
                System.out.println(line);
            }

            int exitCode1 = gAddP.waitFor();
            int exitCode2 = gComP.waitFor();
            //int exitCode3 = gPusP.waitFor();

            if (exitCode1 == 0 && exitCode2 == 0 /*&& exitCode3 == 0*/) {
                System.out.println("Kommandos erfolgreich ausgeführt!");
            } else {
                System.out.println("Fehler beim Ausführen der Kommandos.");
            }
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException(e);
        }


    }

    @FXML
    protected void test() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yy HH:mm:ss");
        System.out.println(now.format(formatter));


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