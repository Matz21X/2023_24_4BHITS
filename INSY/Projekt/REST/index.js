const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// PostgreSQL-Konfiguration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'mysecretpassword',
    port: 5432,
});

app.use(express.json());

// Kunden API-Routen
app.get('/kunden', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Kunden');
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen der Kunden:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

app.post('/kunden', async (req, res) => {
    const { name, ort } = req.body;
    try {
        const result = await pool.query('INSERT INTO Kunden (name, ort) VALUES ($1, $2) RETURNING *', [name, ort]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Fehler beim Hinzufügen des Kunden:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

// Produkte API-Routen
// Hier sind ähnliche Routen für Produkte einzufügen (GET, POST, etc.)
app.get('/produkte', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Produkte');
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen der Produkte:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});


// Bestellungen API-Routen
// Hier sind ähnliche Routen für Bestellungen einzufügen (GET, POST, etc.)
app.get('/bestellungen', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Bestellungen');
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen der Bestellungen:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

// Lager API-Routen
// Hier sind ähnliche Routen für Lager einzufügen (GET, POST, etc.)
app.get('/lager', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Lager');
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen des Lagers:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
