INSERT INTO UserAccounts (username, email, password, first_name, last_name, phone_number)
VALUES
    ('john_doe', 'john.doe@example.com', 'pass123', 'John', 'Doe', '+1234567890'),
    ('jane_smith', 'jane.smith@example.com', 'password456', 'Jane', 'Smith', '+9876543210'),
    ('fit_guru', 'fit.guru@example.com', 'strongpass', 'Fit', 'Guru', '+1122334455'),
    ('active_lifestyle', 'active@example.com', 'activepass', 'Active', 'Lifestyle', '+9988776655'),
    ('fitness_enthusiast', 'fitness@example.com', 'fitpass123', 'Fitness', 'Enthusiast', '+1122339988');

INSERT INTO Address (user_id, address_type, street, city, state, postal_code, country)
VALUES
    (1, 'Shipping', '123 Main St', 'Cityville', 'Stateville', '12345', 'Countryland'),
    (1, 'Billing', '456 Oak Ave', 'Townsville', 'Countyville', '67890', 'Landia'),
    (2, 'Shipping', '789 Pine Blvd', 'Metropolis', 'Stateland', '54321', 'Territoryland'),
    (3, 'Shipping', '101 Maple Ln', 'Villagetown', 'Regionville', '13579', 'Territoryland'),
    (4, 'Billing', '202 Cedar Rd', 'Hamletville', 'Districtville', '24680', 'Countryland'),
    (5, 'Shipping', '303 Elm Street', 'Townsville', 'Countyville', '97531', 'Landia');

INSERT INTO ProductCatalog (product_name, description, price, stock_quantity, image_url)
VALUES
    ('Protein Powder', 'High-quality whey protein for muscle building', 29.99, 100, 'image/protein_powder.jpg'),
    ('BCAA Capsules', 'Branch Chain Amino Acids for recovery', 19.99, 50, 'image/bcaa_capsules.jpg'),
    ('Pre-Workout Blend', 'Energy-boosting pre-workout supplement', 39.99, 75, 'image/pre_workout_blend.jpg'),
    ('Multivitamin Tablets', 'Essential vitamins for overall health', 24.99, 120, 'image/multivitamin_tablets.jpg'),
    ('Omega-3 Fish Oil', 'Omega-3 fatty acids for heart health', 14.99, 80, 'image/omega3_fish_oil.jpg');

INSERT INTO ShoppingCart (user_id)
VALUES
    (1),
    (2),
    (3),
    (4),
    (5);

INSERT INTO CartItems (cart_id, product_id, quantity)
VALUES
    (1, 1, 2),
    (1, 3, 1),
    (2, 2, 3),
    (3, 4, 1),
    (4, 5, 2),
    (5, 1, 1),
    (5, 2, 2);

INSERT INTO Orders (user_id, payment_method, shipping_address_id, billing_address_id, order_status, total_cost)
VALUES
    (1, 'Credit Card', 1, 2, 'Shipped', 109.97),
    (2, 'PayPal', 3, 3, 'Processing', 119.97),
    (3, 'Credit Card', 4, 4, 'Delivered', 64.98),
    (4, 'PayPal', 5, 5, 'Shipped', 69.97),
    (5, 'Credit Card', 6, 6, 'Processing', 69.97);

INSERT INTO OrderItems (order_id, product_id, quantity, price_at_purchase)
VALUES
    (1, 1, 2, 59.98),
    (1, 3, 1, 39.99),
    (2, 2, 3, 59.97),
    (3, 4, 1, 24.99),
    (4, 5, 2, 29.98),
    (5, 1, 1, 29.99),
    (5, 2, 2, 39.98);

