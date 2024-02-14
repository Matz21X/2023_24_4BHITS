const url = 'http://localhost:3000/exoplanets';

async function fetchData() {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        console.log('Data successfully received:', data);
    } catch (error) {
        console.('Error whilst recalling data:', error);
    }
}

fetchData();