// Funktion zur Formatierung und Ausgabe eines Exoplanet-Objekts
function formatExoplanet(exoplanet) {
    return `ID: ${exoplanet.id}\n NAME: ${exoplanet.planet_name}\n HOSTNAME: ${exoplanet.hostname} \n PLANET LETTER: ${exoplanet.planet_letter} \n`;
}

module.exports = formatExoplanet;  // Export der Funktion für die Verwendung in anderen Dateien
