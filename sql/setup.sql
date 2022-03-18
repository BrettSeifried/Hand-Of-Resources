-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS mics;
DROP TABLE IF EXISTS mice;

CREATE TABLE mics (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    input TEXT NOT NULL,
    price INT NOT NULL 
);

CREATE TABLE mice (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    brand TEXT NOT NULL,
    name TEXT NOT NULL,
    price INT NOT NULL 
);

INSERT INTO
    mics (name, input, price)
VALUES
    ('Rode Pod Mic', 'XLR', 100);