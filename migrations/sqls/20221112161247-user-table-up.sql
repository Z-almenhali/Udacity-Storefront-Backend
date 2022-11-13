/* Replace with your SQL commands */
CREATE TABLE "user"(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(64) NOT NULL,
    lastname VARCHAR(64) NOT NULL,
    password_digest text
);