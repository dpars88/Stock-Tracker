DROP DATABASE IF EXISTS portfolios;

CREATE DATABASE portfolios;

/* USE test; */

CREATE TABLE userInfo(
  id SERIAL NOT NULL PRIMARY KEY,
  user_name varchar NOT NULL,
  user_email varchar NOT NULL
);

CREATE TABLE userPortfolio(
  id int NOT NULL PRIMARY KEY,
  stock_symbol varchar NOT NULL,
  current_price int NOT NULL,
  price_when_added int NOT NULL,
  date_when_added date NOT NULL,
  FOREIGN KEY (id) REFERENCES userInfo (id)
);

CREATE TABLE historicalstockprices(
  id int NOT NULL PRIMARY KEY,
  stock_symbol varchar NOT NULL,
  historical_price double pricision NOT NULL,
  date_of_price date,
  FOREIGN KEY (id) REFERENCES userInfo (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
