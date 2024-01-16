const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const {Pool} = require('pg');

const app = express();
const port = 3000;

// PostgreSQL-Konfiguration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'mysecretpassword',
    port: 5555,
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
    apis: ['./swagger.yaml'], // Hier kann der Pfad zu deiner API-Routen-Datei angegeben werden
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


// UserAccount Routen
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

app.put('/useraccounts/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    const {username, email, password, first_name, last_name, phone_number} = req.body;

    try {
        const result = await pool.query('UPDATE UserAccounts SET username=$1, email=$2, password=$3, first_name=$4, last_name=$5, phone_number=$6 WHERE user_id=$7 RETURNING *', [username, email, password, first_name, last_name, phone_number, userId]);

        if (result.rows.length === 0) {
            res.status(404).json({error: 'Benutzerkonto nicht gefunden'});
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        console.error('Fehler beim Aktualisieren des Benutzerkontos:', err);
        res.status(500).json({error: 'Interner Serverfehler: ' + err});
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
        res.status(500).json({error: 'Interner Serverfehler: '} + err);
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

app.put('/addresses/:address_id', async (req, res) => {
    const addressId = req.params.address_id;
    const {address_type, street, city, state, postal_code, country} = req.body;

    try {
        const result = await pool.query('UPDATE Address SET address_type=$1, street=$2, city=$3, state=$4, postal_code=$5, country=$6 WHERE address_id=$7 RETURNING *', [address_type, street, city, state, postal_code, country, addressId]);

        if (result.rows.length === 0) {
            res.status(404).json({error: 'Adresse nicht gefunden'});
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        console.error('Fehler beim Aktualisieren der Adresse:', err);
        res.status(500).json({error: 'Interner Serverfehler: ' + err});
    }
});

app.delete('/addresses/:address_id', async (req, res) => {
    const addressId = req.params.address_id;
    try {
        const result = await pool.query('DELETE FROM Address WHERE address_id=$1 RETURNING *', [addressId]);
        if (result.rows.length === 0) {
            res.status(404).json({error: 'Adresse nicht gefunden'});
        } else {
            res.json({message: 'Adresse erfolgreich gelöscht'});
        }
    } catch (err) {
        console.error('Fehler beim Löschen der Adresse:', err);
        res.status(500).json({error: 'Interner Serverfehler: '} + err);
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

app.put('/productcatalog/:product_id', async (req, res) => {
    const productId = req.params.product_id;
    const {product_name, description, price, stock_quantity, image_url} = req.body;

    try {
        const result = await pool.query('UPDATE ProductCatalog SET product_name=$1, description=$2, price=$3, stock_quantity=$4, image_url=$5 WHERE product_id=$6 RETURNING *', [product_name, description, price, stock_quantity, image_url, productId]);

        if (result.rows.length === 0) {
            res.status(404).json({error: 'Produkt nicht gefunden'});
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        console.error('Fehler beim Aktualisieren des Produkts im Produktkatalog:', err);
        res.status(500).json({error: 'Interner Serverfehler: ' + err});
    }
});

app.delete('/productcatalog/:product_id', async (req, res) => {
    const productId = req.params.product_id;
    try {
        const result = await pool.query('DELETE FROM ProductCatalog WHERE product_id=$1 RETURNING *', [productId]);
        if (result.rows.length === 0) {
            res.status(404).json({error: 'Produkt nicht gefunden'});
        } else {
            res.json({message: 'Produkt  erfolgreich gelöscht'});
        }
    } catch (err) {
        console.error('Fehler beim Löschen des Produkts:', err);
        res.status(500).json({error: 'Interner Serverfehler: '} + err);
    }
});

// ShoppingCart Routen
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

app.put('/shoppingcart/:cart_id', async (req, res) => {
    const cartId = req.params.cart_id;
    const {user_id, created_at} = req.body;

    try {
        const result = await pool.query('UPDATE ShoppingCart SET user_id=$1, created_at=$2 WHERE cart_id=$3 RETURNING *', [user_id, created_at, cartId]);

        if (result.rows.length === 0) {
            res.status(404).json({error: 'Warenkorb nicht gefunden'});
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        console.error('Fehler beim Aktualisieren des Warenkorbs:', err);
        res.status(500).json({error: 'Interner Serverfehler: ' + err});
    }
});

app.delete('/shoppingcart/:cart_id', async (req, res) => {
    const cartId = req.params.cart_id;
    try {
        const result = await pool.query('DELETE FROM Shoppingcart WHERE cart_id=$1 RETURNING *', [cartId]);
        if (result.rows.length === 0) {
            res.status(404).json({error: 'Shoppingcart nicht gefunden'});
        } else {
            res.json({message: 'Shoppingcart erfolgreich gelöscht'});
        }
    } catch (err) {
        console.error('Fehler beim Löschen des Shoppingcarts:', err);
        res.status(500).json({error: 'Interner Serverfehler: '} + err);
    }
});

// Cartitems Routen
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

app.put('/cartitems/:cart_item_id', async (req, res) => {
    const cartItemId = req.params.cart_item_id;
    const {cart_id, product_id, quantity} = req.body;

    try {
        const result = await pool.query('UPDATE CartItems SET cart_id=$1, product_id=$2, quantity=$3 WHERE cart_item_id=$4 RETURNING *', [cart_id, product_id, quantity, cartItemId]);

        if (result.rows.length === 0) {
            res.status(404).json({error: 'CartItem nicht gefunden'});
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        console.error('Fehler beim Aktualisieren der Warenkorbposition:', err);
        res.status(500).json({error: 'Interner Serverfehler: ' + err});
    }
});

app.delete('/cartitems/:cart_item_id', async (req, res) => {
    const cartItemId = req.params.cart_item_id;
    try {
        const result = await pool.query('DELETE FROM CartItems WHERE cart_item_id=$1 RETURNING *', [cartItemId]);
        if (result.rows.length === 0) {
            res.status(404).json({error: 'CartItem nicht gefunden'});
        } else {
            res.json({message: 'CartItem erfolgreich gelöscht'});
        }
    } catch (err) {
        console.error('Fehler beim Löschen des CartItems:', err);
        res.status(500).json({error: 'Interner Serverfehler: '} + err);
    }
});


// Orders Routen
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

app.put('/orders/:order_id', async (req, res) => {
    const orderId = req.params.order_id;
    const {user_id, payment_method, shipping_address_id, billing_address_id, order_status, order_date, total_cost} = req.body;

    try {
        const result = await pool.query('UPDATE Orders SET user_id=$1, payment_method=$2, shipping_address_id=$3, billing_address_id=$4, order_status=$5, order_date=$6, total_cost=$7 WHERE order_id=$8 RETURNING *', [user_id, payment_method, shipping_address_id, billing_address_id, order_status, order_date, total_cost, orderId]);

        if (result.rows.length === 0) {
            res.status(404).json({error: 'Bestellung nicht gefunden'});
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        console.error('Fehler beim Aktualisieren der Bestellung:', err);
        res.status(500).json({error: 'Interner Serverfehler: ' + err});
    }
});

app.delete('/orders/:order_id', async (req, res) => {
    const order_id = req.params.order_id;
    try {
        const result = await pool.query('DELETE FROM Orders WHERE order_id=$1 RETURNING *', [order_id]);
        if (result.rows.length === 0) {
            res.status(404).json({error: 'Order nicht gefunden'});
        } else {
            res.json({message: 'Order erfolgreich gelöscht'});
        }
    } catch (err) {
        console.error('Fehler beim Löschen der Order:', err);
        res.status(500).json({error: 'Interner Serverfehler: '} + err);
    }
});


// Orderitems Routen
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

app.put('/orderitems/:order_item_id', async (req, res) => {
    const orderItemId = req.params.order_item_id;
    const {order_id, product_id, quantity, price_at_purchase} = req.body;

    try {
        const result = await pool.query('UPDATE OrderItems SET order_id=$1, product_id=$2, quantity=$3, price_at_purchase=$4 WHERE order_item_id=$5 RETURNING *', [order_id, product_id, quantity, price_at_purchase, orderItemId]);

        if (result.rows.length === 0) {
            res.status(404).json({error: 'Bestellposition nicht gefunden'});
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        console.error('Fehler beim Aktualisieren der Bestellposition:', err);
        res.status(500).json({error: 'Interner Serverfehler: ' + err});
    }
});

app.delete('/orderitems/:order_item_id', async (req, res) => {
    const order_item_id = req.params.order_item_id;
    try {
        console.log('order_item_id:', order_item_id);
        const result = await pool.query('DELETE FROM OrderItems WHERE order_item_id=$1 RETURNING *', [order_item_id]);
        if (result.rows.length === 0) {
            res.status(404).json({error: 'OrderItem nicht gefunden'});
        } else {
            res.json({message: `OrderItem ${order_item_id} erfolgreich gelöscht`});
        }
    } catch (err) {
        console.error('Fehler beim Löschen des OrderItems:', err);
        res.status(500).json({error: 'Interner Serverfehler: '} + err);
    }
});


app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});