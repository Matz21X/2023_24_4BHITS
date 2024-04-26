const fs = require('fs');
const https = require('http');

const dateiPfad = 'output.txt';

const agent = new https.Agent({ localPort: 27000 }); 

function linksAufrufen(dateiPfad) {
    try {
        const daten = fs.readFileSync(dateiPfad, 'utf8');
        const links = daten.split('\n'); 

        function aufrufenMitVerzögerung(index) {
            if (index < links.length) {
                https.get(links[index], { agent: agent }, (res) => {
                    console.log(`Erfolgreich aufgerufen: ${links[index]} ` + index + ' ');
                    setTimeout(() => {
                        aufrufenMitVerzögerung(index + 1);
                    }, 10); 

                
                }).on('error', (err) => {
                    console.error(`Fehler beim Aufrufen von ${links[index]}: ${err.message}`);
                    // Rufe den nächsten Link nach einer Verzögerung auf, auch im Fehlerfall
                    setTimeout(() => {
                        aufrufenMitVerzögerung(index + 1);
                    }, 3000); // 500 Millisekunden Verzögerung
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
