# Protokoll (Hrbek & Thienel)
#INSY 

In diesem Projekt wird eine Datenbank für einen Online-Einzelhandel. Datenbank (Postgres) und API (NodeJS) laufen in Docker Containern

**Software:**
- Docker
- NodeJS
- Postgres

## Datenbankstruktur


**SQL query:**
```SQL
-- UserAccounts Tabelle  
CREATE TABLE UserAccounts (  
    user_id SERIAL PRIMARY KEY,  
    username VARCHAR(255),  
    email VARCHAR(255),  
    password VARCHAR(255),  
    first_name VARCHAR(255),  
    last_name VARCHAR(255),  
    phone_number VARCHAR(20),  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);  
  
-- Address Tabelle  
CREATE TABLE Address (  
    address_id SERIAL PRIMARY KEY,  
    user_id INT,  
    address_type VARCHAR(50),  
    street VARCHAR(255),  
    city VARCHAR(255),  
    state VARCHAR(255),  
    postal_code VARCHAR(20),  
    country VARCHAR(255),  
    FOREIGN KEY (user_id) REFERENCES UserAccounts(user_id)  
);  
  
-- ProductCatalog Tabelle  
CREATE TABLE ProductCatalog (  
    product_id SERIAL PRIMARY KEY,  
    product_name VARCHAR(255),  
    description TEXT,  
    price DECIMAL(10, 2),  
    stock_quantity INT,  
    image_url VARCHAR(255)  
);  
  
-- ShoppingCart Tabelle  
CREATE TABLE ShoppingCart (  
    cart_id SERIAL PRIMARY KEY,  
    user_id INT,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    FOREIGN KEY (user_id) REFERENCES UserAccounts(user_id)  
);  
  
-- CartItems Tabelle  
CREATE TABLE CartItems (  
    cart_item_id SERIAL PRIMARY KEY,  
    cart_id INT,  
    product_id INT,  
    quantity INT,  
    FOREIGN KEY (cart_id) REFERENCES ShoppingCart(cart_id),  
    FOREIGN KEY (product_id) REFERENCES ProductCatalog(product_id)  
);  
  
-- Orders Tabelle  
CREATE TABLE Orders (  
    order_id SERIAL PRIMARY KEY,  
    user_id INT,  
    payment_method VARCHAR(255),  
    shipping_address_id INT,  
    billing_address_id INT,  
    order_status VARCHAR(50),  
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    total_cost DECIMAL(10, 2),  
    FOREIGN KEY (user_id) REFERENCES UserAccounts(user_id),  
    FOREIGN KEY (shipping_address_id) REFERENCES Address(address_id),  
    FOREIGN KEY (billing_address_id) REFERENCES Address(address_id)  
);  
  
-- OrderItems Tabelle  
CREATE TABLE OrderItems (  
    order_item_id SERIAL PRIMARY KEY,  
    order_id INT,  
    product_id INT,  
    quantity INT,  
    price_at_purchase DECIMAL(10, 2),  
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),  
    FOREIGN KEY (product_id) REFERENCES ProductCatalog(product_id)  
);
```

## Startup:

1. Start Docker-Postgres Container
```powershell
PS C:\Users\matth> docker start postgres
postgres
```
1. Start API with `npm start`
```powershell
PS C:\Users\matth\Documents\2023_24_4BHITS\INSY\Projekt\REST> npm start

> rest@1.0.0 start
> node index.js

Server läuft auf http://localhost:3000
```
3. Start Python GUI

Note:
```bash
pyinstaller main.py --onefile -w
```