-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS mics;
DROP TABLE IF EXISTS mice;
DROP TABLE IF EXISTS keyboards;
DROP TABLE IF EXISTS games;

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

CREATE TABLE keyboards (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    brand TEXT NOT NULL,
    name TEXT NOT NULL,
    mech BOOLEAN 
);

CREATE TABLE games (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    rating SMALLINT NOT NULL 
);

INSERT INTO
    mics (name, input, price)
VALUES
    ('Rode Pod Mic', 'XLR', 100);