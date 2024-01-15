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
 *   name: UserAccounts
 *   description: Operationen im Zusammenhang mit Benutzerkonten
 */

// Benutzerkonten API-Routen
/**
 * @openapi
 * /useraccounts:
 *   get:
 *     summary: Gibt alle Benutzerkonten zurück.
 *     responses:
 *       200:
 *         description: Erfolgreiche Anfrage. Gibt eine Liste der Benutzerkonten zurück.
 */
app.get('/useraccounts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM UserAccounts');
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen der Benutzerkonten:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

/**
 * @openapi
 * /useraccounts:
 *   post:
 *     summary: Fügt ein neues Benutzerkonto hinzu.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               created_at:
 *                 type: string
 *                 format: date-time
 *             required:
 *               - username
 *               - email
 *               - password
 *               - first_name
 *               - last_name
 *               - phone_number
 *               - created_at
 *     responses:
 *       200:
 *         description: Erfolgreiche Anfrage. Gibt das hinzugefügte Benutzerkonto zurück.
 */
app.post('/useraccounts', async (req, res) => {
    const { username, email, password, first_name, last_name, phone_number, created_at } = req.body;
    try {
        const result = await pool.query('INSERT INTO UserAccounts (username, email, password, first_name, last_name, phone_number, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [username, email, password, first_name, last_name, phone_number, created_at]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Fehler beim Hinzufügen des Benutzerkontos:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

/**
 * @openapi
 * /useraccounts/:user_id:
 *   delete:
 *     summary: Gibt alle Adressen zurück.
 *     responses:
 *       200:
 *         description: Erfolgreiche Anfrage. Gibt eine Liste der Adressen zurück.
 */
app.delete('/useraccounts/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    try {
        const result = await pool.query('DELETE FROM UserAccounts WHERE user_id=$1 RETURNING *', [userId]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Benutzerkonto nicht gefunden' });
        } else {
            res.json({ message: 'Benutzerkonto erfolgreich gelöscht' });
        }
    } catch (err) {
        console.error('Fehler beim Löschen des Benutzerkontos:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});


/**
 * @openapi
 * tags:
 *   name: Address
 *   description: Operationen im Zusammenhang mit Adressen
 */

// Address API-Routen
/**
 * @openapi
 * /addresses:
 *   get:
 *     summary: Gibt alle Adressen zurück.
 *     responses:
 *       200:
 *         description: Erfolgreiche Anfrage. Gibt eine Liste der Adressen zurück.
 */
app.get('/addresses', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Address');
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen der Adressen:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

/**
 * @openapi
 * /addresses:
 *   post:
 *     summary: Fügt eine neue Adresse hinzu.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               address_type:
 *                 type: string
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               postal_code:
 *                 type: string
 *               country:
 *                 type: string
 *             required:
 *               - user_id
 *               - address_type
 *               - street
 *               - city
 *               - state
 *               - postal_code
 *               - country
 *     responses:
 *       200:
 *         description: Erfolgreiche Anfrage. Gibt die hinzugefügte Adresse zurück.
 */
app.post('/addresses', async (req, res) => {
    const { user_id, address_type, street, city, state, postal_code, country } = req.body;
    try {
        const result = await pool.query('INSERT INTO Address (user_id, address_type, street, city, state, postal_code, country) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [user_id, address_type, street, city, state, postal_code, country]);
        res.json(result.rows[0]);
    } catch (err) {

        console.error('Fehler beim Hinzufügen der Adresse:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

/**
 * @openapi
 * tags:
 *   name: ProductCatalog
 *   description: Operationen im Zusammenhang mit dem Produktkatalog
 */

// ProductCatalog API-Routen
/**
 * @openapi
 * /productcatalog:
 *   get:
 *     summary: Gibt alle Produkte im Katalog zurück.
 *     responses:
 *       200:
 *         description: Erfolgreiche Anfrage. Gibt eine Liste der Produkte im Katalog zurück.
 */
app.get('/productcatalog', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM ProductCatalog');
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen des Produktkatalogs:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

/**
 * @openapi
 * /productcatalog:
 *   post:
 *     summary: Fügt ein neues Produkt zum Katalog hinzu.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock_quantity:
 *                 type: integer
 *               image_url:
 *                 type: string
 *             required:
 *               - product_name
 *               - description
 *               - price
 *               - stock_quantity
 *               - image_url
 *     responses:
 *       200:
 *         description: Erfolgreiche Anfrage. Gibt das hinzugefügte Produkt im Katalog zurück.
 */
app.post('/productcatalog', async (req, res) => {
    const { product_name, description, price, stock_quantity, image_url } = req.body;
    try {
        const result = await pool.query('INSERT INTO ProductCatalog (product_name, description, price, stock_quantity, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *', [product_name, description, price, stock_quantity, image_url]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Fehler beim Hinzufügen zum Produktkatalog:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

/**
 * @openapi
 * tags:
 *   name: ShoppingCart
 *   description: Operationen im Zusammenhang mit dem Warenkorb
 */

// ShoppingCart API-Routen
/**
 * @openapi
 * /shoppingcart:
 *   get:
 *     summary: Gibt alle Warenkörbe zurück.
 *     responses:
 *       200:
 *         description: Erfolgreiche Anfrage. Gibt eine Liste der Warenkörbe zurück.
 */
app.get('/shoppingcart', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM ShoppingCart');
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen der Warenkörbe:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

/**
 * @openapi
 * /shoppingcart:
 *   post:
 *     summary: Fügt einen neuen Warenkorb hinzu.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               created_at:
 *                 type: string
 *                 format: date-time
 *             required:
 *               - user_id
 *               - created_at
 *     responses:
 *       200:
 *         description: Erfolgreiche Anfrage. Gibt den hinzugefügten Warenkorb zurück.
 */
app.post('/shoppingcart', async (req, res) => {
    const { user_id, created_at } = req.body;
    try {
        const result = await pool.query('INSERT INTO ShoppingCart (user_id, created_at) VALUES ($1, $2) RETURNING *', [user_id, created_at]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Fehler beim Hinzufügen zum Warenkorb:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

/**
 * @openapi
 * tags:
 *   name: CartItems
 *   description: Operationen im Zusammenhang mit den Warenkorbpositionen
 */

// CartItems API-Routen
/**
 * @openapi
 * /cartitems:
 *   get:
 *     summary: Gibt alle Warenkorbpositionen zurück.
 *     responses:
 *       200:
 *         description: Erfolgreiche Anfrage. Gibt eine Liste der Warenkorbpositionen zurück.
 */
app.get('/cartitems', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM CartItems');
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen der Warenkorbpositionen:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

/**
 * @openapi
 * /cartitems:
 *   post:
 *     summary: Fügt eine neue Warenkorbposition hinzu.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart_id:
 *                 type: integer
 *               product_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *             required:
 *               - cart_id
 *               - product_id
 *               - quantity
 *     responses:
 *       200:
 *         description: Erfolgreiche Anfrage. Gibt die hinzugefügte Warenkorbposition zurück.
 */
app.post('/cartitems', async (req, res) => {
    const { cart_id, product_id, quantity } = req.body;
    try {
        const result = await pool.query('INSERT INTO CartItems (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [cart_id, product_id, quantity]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Fehler beim Hinzufügen zur Warenkorbpositionen:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

/**
 * @openapi
 * tags:
 *   name: Orders
 *   description: Operationen im Zusammenhang mit Bestellungen
 */

// Orders API-Routen
/**
 * @openapi
 * /orders:
 *   get:
 *     summary: Gibt alle Bestellungen zurück.
 *     responses:
 *       200:
 *         description: Erfolgreiche Anfrage. Gibt eine Liste der Bestellungen zurück.
 */
app.get('/orders', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Orders');
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen der Bestellungen:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

/**
 * @openapi
 * /orders:
 *   post:
 *     summary: Fügt eine neue Bestellung hinzu.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               payment_method:
 *                 type: string
 *               shipping_address_id:
 *                 type: integer
 *               billing_address_id:
 *                 type: integer
 *               order_status:
 *                 type: string
 *               order_date:
 *                 type: string
 *                 format: date-time
 *               total_cost:
 *                 type: number
 *             required:
 *               - user_id
 *               - payment_method
 *               - shipping_address_id
 *               - billing_address_id
 *               - order_status
 *               - order_date
 *               - total_cost
 *     responses:
 *       200:
 *         description: Erfolgreiche Anfrage. Gibt die hinzugefügte Bestellung zurück.
 */
app.post('/orders', async (req, res) => {
    const { user_id, payment_method, shipping_address_id, billing_address_id, order_status, order_date, total_cost } = req.body;
    try {
        const result = await pool.query('INSERT INTO Orders (user_id, payment_method, shipping_address_id, billing_address_id, order_status, order_date, total_cost) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [user_id, payment_method, shipping_address_id, billing_address_id, order_status, order_date, total_cost]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Fehler beim Hinzufügen der Bestellung:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

/**
 * @openapi
 * tags:
 *   name: OrderItems
 *   description: Operationen im Zusammenhang mit Bestellpositionen
 */

// OrderItems API-Routen
/**
 * @openapi
 * /orderitems:
 *   get:
 *     summary: Gibt alle Bestellpositionen zurück.
 *     responses:
 *       200:
 *         description: Erfolgreiche Anfrage. Gibt eine Liste der Bestellpositionen zurück.
 */
app.get('/orderitems', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM OrderItems');
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen der Bestellpositionen:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

/**
 * @openapi
 * /orderitems:
 *   post:
 *     summary: Fügt eine neue Bestellposition hinzu.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: integer
 *               product_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               price_at_purchase:
 *                 type: number
 *             required:
 *               - order_id
 *               - product_id
 *               - quantity
 *               - price_at_purchase
 *     responses:
 *       200:
 *         description: Erfolgreiche Anfrage. Gibt die hinzugefügte Bestellposition zurück.
 */
app.post('/orderitems', async (req, res) => {
    const { order_id, product_id, quantity, price_at_purchase } = req.body;
    try {
        const result = await pool.query('INSERT INTO OrderItems (order_id, product_id, quantity, price_at_purchase) VALUES ($1, $2, $3, $4) RETURNING *', [order_id, product_id, quantity, price_at_purchase]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Fehler beim Hinzufügen zur Bestellpositionen:', err);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});