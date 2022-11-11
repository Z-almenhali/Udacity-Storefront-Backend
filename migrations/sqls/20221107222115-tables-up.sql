/* Replace with your SQL commands */
CREATE TABLE "user"(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(64) NOT NULL,
    lastname VARCHAR(64) NOT NULL,
    password_digest text
);
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id bigint REFERENCES "user"(id)
);
CREATE TABLE product(
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price integer NOT NULL,
    category VARCHAR(64) NOT NULL
);
CREATE TABLE order_products(
    id SERIAL PRIMARY KEY,
    quantity integer,
    orderId bigint REFERENCES orders(id),
    productId bigint REFERENCES product(id)
);