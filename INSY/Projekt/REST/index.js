const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// PostgreSQL-Konfiguration
const pool = new Pool({
    user: 'dein_pg_benutzername',
    host: 'localhost',
    database: 'deine_datenbank',
    password: 'dein_pg_passwort',
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

// Bestellungen API-Routen
// Hier sind ähnliche Routen für Bestellungen einzufügen (GET, POST, etc.)

// Lager API-Routen
// Hier sind ähnliche Routen für Lager einzufügen (GET, POST, etc.)

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
