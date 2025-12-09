-- Dim Fund
CREATE TABLE IF NOT EXISTS dim_fund (
    fund_id_sk SERIAL PRIMARY KEY,
    fund_name VARCHAR(255) NOT NULL,
    fund_created_date DATE NOT NULL,
    load_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dim Deal
CREATE TABLE IF NOT EXISTS dim_deal (
    deal_id_sk SERIAL PRIMARY KEY,
    deal_name VARCHAR(255) NOT NULL,
    deal_created_date DATE NOT NULL,
    load_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dim Investor
CREATE TABLE IF NOT EXISTS dim_investor (
    investor_id_sk SERIAL PRIMARY KEY,
    investor_name VARCHAR(255) NOT NULL,
    investor_created_date DATE NOT NULL,
    load_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dim Currency
CREATE TABLE IF NOT EXISTS dim_currency (
    currency_id_sk SERIAL PRIMARY KEY,
    currency_name VARCHAR(100) NOT NULL,
    currency_iso CHAR(3) NOT NULL,
    load_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dim Transaction Type
CREATE TABLE IF NOT EXISTS dim_transaction_type (
    tx_type_id_sk SERIAL PRIMARY KEY,
    tx_type_name VARCHAR(100) NOT NULL,
    load_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
