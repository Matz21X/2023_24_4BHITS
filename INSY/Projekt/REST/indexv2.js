const express = require('express');
const { readFileSync } = require('fs');
const { join } = require('path');
const { swaggerUi, specs } = require('swagger-ui-express');

const {Pool} = require('pg');
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
const swaggerDocument = readFileSync(join(__dirname, 'swagger.yaml'), 'utf8');
const swaggerData = YAML.parse(swaggerDocument);

// Verwende Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerData));



app.get('/useraccounts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM UserAccounts');
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen der Benutzerkonten:', err);
        res.status(500).json({error: 'Interner Serverfehler'});
    }
});


app.post('/useraccounts', async (req, res) => {
    const {username, email, password, first_name, last_name, phone_number, created_at} = req.body;
    try {
        const result = await pool.query('INSERT INTO UserAccounts (username, email, password, first_name, last_name, phone_number, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [username, email, password, first_name, last_name, phone_number, created_at]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Fehler beim Hinzufügen des Benutzerkontos:', err);
        res.status(500).json({error: 'Interner Serverfehler'});
    }
});

app.delete('/useraccounts/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    try {
        const result = await pool.query('DELETE FROM UserAccounts WHERE user_id=$1 RETURNING *', [userId]);
        if (result.rows.length === 0) {
            res.status(404).json({error: 'Benutzerkonto nicht gefunden'});
        } else {
            res.json({message: 'Benutzerkonto erfolgreich gelöscht'});
        }
    } catch (err) {
        console.error('Fehler beim Löschen des Benutzerkontos:', err);
        res.status(500).json({error: 'Interner Serverfehler'});
    }
});


// Address API-Routen

app.get('/addresses', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Address');
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen der Adressen:', err);
        res.status(500).json({error: 'Interner Serverfehler'});
    }
});


app.post('/addresses', async (req, res) => {
    const {user_id, address_type, street, city, state, postal_code, country} = req.body;
    try {
        const result = await pool.query('INSERT INTO Address (user_id, address_type, street, city, state, postal_code, country) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [user_id, address_type, street, city, state, postal_code, country]);
        res.json(result.rows[0]);
    } catch (err) {

        console.error('Fehler beim Hinzufügen der Adresse:', err);
        res.status(500).json({error: 'Interner Serverfehler'});
    }
});


// ProductCatalog API-Routen

app.get('/productcatalog', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM ProductCatalog');
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen des Produktkatalogs:', err);
        res.status(500).json({error: 'Interner Serverfehler'});
    }
});


app.post('/productcatalog', async (req, res) => {
    const {product_name, description, price, stock_quantity, image_url} = req.body;
    try {
        const result = await pool.query('INSERT INTO ProductCatalog (product_name, description, price, stock_quantity, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *', [product_name, description, price, stock_quantity, image_url]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Fehler beim Hinzufügen zum Produktkatalog:', err);
        res.status(500).json({error: 'Interner Serverfehler'});
    }
});


app.get('/shoppingcart', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM ShoppingCart');
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen der Warenkörbe:', err);
        res.status(500).json({error: 'Interner Serverfehler'});
    }
});

app.post('/shoppingcart', async (req, res) => {
    const {user_id, created_at} = req.body;
    try {
        const result = await pool.query('INSERT INTO ShoppingCart (user_id, created_at) VALUES ($1, $2) RETURNING *', [user_id, created_at]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Fehler beim Hinzufügen zum Warenkorb:', err);
        res.status(500).json({error: 'Interner Serverfehler'});
    }
});


app.get('/cartitems', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM CartItems');
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen der Warenkorbpositionen:', err);
        res.status(500).json({error: 'Interner Serverfehler'});
    }
});


app.post('/cartitems', async (req, res) => {
    const {cart_id, product_id, quantity} = req.body;
    try {
        const result = await pool.query('INSERT INTO CartItems (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [cart_id, product_id, quantity]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Fehler beim Hinzufügen zur Warenkorbpositionen:', err);
        res.status(500).json({error: 'Interner Serverfehler'});
    }
});


app.get('/orders', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Orders');
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen der Bestellungen:', err);
        res.status(500).json({error: 'Interner Serverfehler'});
    }
});


app.post('/orders', async (req, res) => {
    const {
        user_id,
        payment_method,
        shipping_address_id,
        billing_address_id,
        order_status,
        order_date,
        total_cost
    } = req.body;
    try {
        const result = await pool.query('INSERT INTO Orders (user_id, payment_method, shipping_address_id, billing_address_id, order_status, order_date, total_cost) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [user_id, payment_method, shipping_address_id, billing_address_id, order_status, order_date, total_cost]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Fehler beim Hinzufügen der Bestellung:', err);
        res.status(500).json({error: 'Interner Serverfehler'});
    }
});

app.get('/orderitems', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM OrderItems');
        res.json(result.rows);
    } catch (err) {
        console.error('Fehler beim Abrufen der Bestellpositionen:', err);
        res.status(500).json({error: 'Interner Serverfehler'});
    }
});


app.post('/orderitems', async (req, res) => {
    const {order_id, product_id, quantity, price_at_purchase} = req.body;
    try {
        const result = await pool.query('INSERT INTO OrderItems (order_id, product_id, quantity, price_at_purchase) VALUES ($1, $2, $3, $4) RETURNING *', [order_id, product_id, quantity, price_at_purchase]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Fehler beim Hinzufügen zur Bestellpositionen:', err);
        res.status(500).json({error: 'Interner Serverfehler'});
    }
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});