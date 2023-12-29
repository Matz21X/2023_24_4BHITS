const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
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

// Swagger-Optionen
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API-Dokumentation',
            version: '1.0.0',
            description: 'API-Dokumentation für deine Anwendung',
        },
    },
    apis: [__filename], // Hier kann der Pfad zu deiner API-Routen-Datei angegeben werden
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/**
 * @openapi
 * tags:
 *   name: Kunden
 *   description: Operationen im Zusammenhang mit Kunden
 */

// Kunden API-Routen
/**
 * @openapi
 * /kunden:
 *   get:
 *     summary: Gibt alle Kunden zurück.
 *     responses:
 *       200:
 *         description: Erfolgreiche Anfrage. Gibt eine Liste der Kunden zurück.
 */
app.get('/kunden', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Kunden');
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen der Kunden:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

/**
 * @openapi
 * /kunden:
 *   post:
 *     summary: Fügt einen neuen Kunden hinzu.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               ort:
 *                 type: string
 *             required:
 *               - name
 *               - ort
 *     responses:
 *       200:
 *         description: Erfolgreiche Anfrage. Gibt den hinzugefügten Kunden zurück.
 */
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

/**
 * @openapi
 * tags:
 *   name: Produkte
 *   description: Operationen im Zusammenhang mit Produkten
 */

// Produkte API-Routen
/**
 * @openapi
 * /produkte:
 *   get:
 *     summary: Gibt alle Produkte zurück.
 *     responses:
 *       200:
 *         description: Erfolgreiche Anfrage. Gibt eine Liste der Produkte zurück.
 */
app.get('/produkte', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Produkte');
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen der Produkte:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

/**
 * @openapi
 * /produkte:
 *   post:
 *     summary: Fügt ein neues Produkt hinzu.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               preis:
 *                 type: number
 *               gewicht:
 *                 type: number
 *             required:
 *               - name
 *               - preis
 *               - gewicht
 *     responses:
 *       200:
 *         description: Erfolgreiche Anfrage. Gibt das hinzugefügte Produkt zurück.
 */
app.post('/produkte', async (req, res) => {
    const { name, preis, gewicht } = req.body;
    try {
        const result = await pool.query('INSERT INTO Produkte (name, preis, gewicht) VALUES ($1, $2, $3) RETURNING *', [name, preis, gewicht]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Fehler beim Hinzufügen des Produkts:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

/**
 * @openapi
 * tags:
 *   name: Bestellungen
 *   description: Operationen im Zusammenhang mit Bestellungen
 */

// Bestellungen API-Routen
/**
 * @openapi
 * /bestellungen:
 *   get:
 *     summary: Gibt alle Bestellungen zurück.
 *     responses:
 *       200:
 *         description: Erfolgreiche Anfrage. Gibt eine Liste der Bestellungen zurück.
 */
app.get('/bestellungen', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Bestellungen');
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen der Bestellungen:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

/**
 * @openapi
 * /bestellungen:
 *   post:
 *     summary: Fügt eine neue Bestellung hinzu.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               kunden_id:
 *                 type: integer
 *               produkt_id:
 *                 type: integer
 *               anzahl:
 *                 type: integer
 *               betrag:
 *                 type: number
 *               bestelldatum:
 *                 type: string
 *                 format: date
 *             required:
 *               - kunden_id
 *               - produkt_id
 *               - anzahl
 *               - betrag
 *               - bestelldatum
 *     responses:
 *       200:
 *         description: Erfolgreiche Anfrage. Gibt die hinzugefügte Bestellung zurück.
 */
app.post('/bestellungen', async (req, res) => {
    const { kunden_id, produkt_id, anzahl, betrag, bestelldatum } = req.body;
    try {
        const result = await pool.query('INSERT INTO Bestellungen (kunden_id, produkt_id, anzahl, betrag, bestelldatum) VALUES ($1, $2, $3, $4, $5) RETURNING *', [kunden_id, produkt_id, anzahl, betrag, bestelldatum]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Fehler beim Hinzufügen der Bestellung:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

/**
 * @openapi
 * tags:
 *   name: Lager
 *   description: Operationen im Zusammenhang mit Lager
 */

// Lager API-Routen
/**
 * @openapi
 * /lager:
 *   get:
 *     summary: Gibt alle Lagerbestände zurück.
 *     responses:
 *       200:
 *         description: Erfolgreiche Anfrage. Gibt eine Liste der Lagerbestände zurück.
 */
app.get('/lager', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Lager');
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen des Lagers:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

/**
 * @openapi
 * /lager:
 *   post:
 *     summary: Fügt einen neuen Lagerbestand hinzu.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               produkt_id:
 *                 type: integer
 *               anzahl:
 *                 type: integer
 *               datumNeulieferung:
 *                 type: string
 *                 format: date
 *             required:
 *               - produkt_id
 *               - anzahl
 *               - datumNeulieferung
 *     responses:
 *       200:
 *         description: Erfolgreiche Anfrage. Gibt den hinzugefügten Lagerbestand zurück.
 */
app.post('/lager', async (req, res) => {
    const { produkt_id, anzahl, datumNeulieferung } = req.body;
    try {
        const result = await pool.query('INSERT INTO Lager (produkt_id, anzahl, datumNeulieferung) VALUES ($1, $2, $3) RETURNING *', [produkt_id, anzahl, datumNeulieferung]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Fehler beim Hinzufügen zum Lager:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});