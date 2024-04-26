const fs = require("fs");
const https = require("https");

// Dateipfad zur Liste der Links
const dateiPfad = "output.txt";

// Funktion zum Lesen der Datei und Aufrufen der Links mit Verzögerung
function linksAufrufen(dateiPfad) {
  // Lese die Datei synchron
  try {
    const daten = fs.readFileSync(dateiPfad, "utf8");
    const links = daten.split("\n"); // Annahme: Jede Zeile enthält einen Link

    // Funktion zur Verzögerung zwischen den Aufrufen
    function aufrufenMitVerzögerung(index) {
      if (index < links.length) {
        // Führe eine HTTP GET-Anfrage für den Link aus
        https
          .get(links[index], (res) => {
            console.log(`Erfolgreich aufgerufen: ${links[index]}`);
            // Rufe den nächsten Link nach einer Verzögerung auf
            setTimeout(() => {
              aufrufenMitVerzögerung(index + 1);
            }, 500); // 500 Millisekunden Verzögerung
          })
          .on("error", (err) => {
            console.error(
              `Fehler beim Aufrufen von ${links[index]}: ${err.message}`
            );
            // Rufe den nächsten Link nach einer Verzögerung auf, auch im Fehlerfall
            setTimeout(() => {
              aufrufenMitVerzögerung(index + 1);
            }, 500); // 500 Millisekunden Verzögerung
          });
      }
    }

    // Starte den Aufruf mit Verzögerung, beginnend mit dem ersten Link
    aufrufenMitVerzögerung(0);
  } catch (err) {
    console.error(`Fehler beim Lesen der Datei: ${err.message}`);
  }
}

// Rufe die Funktion zum Aufrufen der Links auf
linksAufrufen(dateiPfad);
