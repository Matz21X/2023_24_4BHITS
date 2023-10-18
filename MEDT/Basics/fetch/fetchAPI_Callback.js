const url = 'http://localhost:3000/exoplanets';

function fetchDataWithCallbacks() {
    fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log('Data successfully received:', data);
        })
        .catch((error) => {
            console.error('Error whilst recalling data:', error);
        });
}

function formatExoplanet(exoplanet) {
    return `ID: ${exoplanet.id}\n NAME: ${exoplanet.planet_name}\n HOSTNAME: ${exoplanet.hostname} \n PLANET LETTER: ${exoplanet.planet_letter} \n`;
}

fetchDataWithCallbacks();