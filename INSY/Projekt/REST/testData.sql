-- UserAccounts Tabelle
INSERT INTO UserAccounts (username, email, password, first_name, last_name, phone_number)
VALUES ('john_doe', 'john.doe@example.com', 'hashed_password_1', 'John', 'Doe', '+12345678901'),
       ('jane_smith', 'jane.smith@example.com', 'hashed_password_2', 'Jane', 'Smith', '+98765432101');

-- Address Tabelle
INSERT INTO Address (user_id, address_type, street, city, state, postal_code, country)
VALUES (1, 'Home', '123 Main St', 'Cityville', 'Stateland', '12345', 'Countryland'),
       (2, 'Work', '456 Business St', 'Worktown', 'Workstate', '54321', 'Workcountry');

-- ProductCatalog Tabelle
INSERT INTO ProductCatalog (product_name, description, price, stock_quantity, image_url)
VALUES ('Product A', 'Description for Product A', 19.99, 100, 'product_a_image.jpg'),
       ('Product B', 'Description for Product B', 29.99, 50, 'product_b_image.jpg');

-- ShoppingCart Tabelle
INSERT INTO ShoppingCart (user_id)
VALUES (1),
       (2);

-- CartItems Tabelle
INSERT INTO CartItems (cart_id, product_id, quantity)
VALUES (1, 1, 2),
       (1, 2, 1),
       (2, 2, 3);

-- Orders Tabelle
INSERT INTO Orders (user_id, payment_method, shipping_address_id, billing_address_id, order_status, total_cost)
VALUES (1, 'Credit Card', 1, 1, 'Processing', 69.97),
       (2, 'PayPal', 2, 2, 'Shipped', 119.97);

-- OrderItems Tabelle
INSERT INTO OrderItems (order_id, product_id, quantity, price_at_purchase)
VALUES (1, 1, 2, 39.98),
       (1, 2, 1, 29.99),
       (2, 2, 3, 89.97);
