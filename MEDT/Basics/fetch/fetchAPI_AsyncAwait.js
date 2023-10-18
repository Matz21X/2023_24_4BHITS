const url = 'http://localhost:3000/exoplanets';

async function fetchDataWithAsyncAwait() {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        console.log('Data successfully received:', data);
    } catch (error) {
        console.error('Error whilst recalling data:', error);
    }
}

fetchDataWithAsyncAwait();