-- Fact Transaction
CREATE TABLE fact_transaction (
    transaction_id BIGSERIAL PRIMARY KEY,
    fund_id_sk INT NOT NULL,
    deal_id_sk INT NOT NULL,
    currency_id_sk INT NOT NULL,
    tx_type_id_sk INT NOT NULL,
    trans_amount NUMERIC(18,2) NOT NULL,
    trans_date DATE NOT NULL,
    load_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_fact_transaction_fund FOREIGN KEY (fund_id_sk)
        REFERENCES dim_fund(fund_id_sk),
    CONSTRAINT fk_fact_transaction_deal FOREIGN KEY (deal_id_sk)
        REFERENCES dim_deal(deal_id_sk),
    CONSTRAINT fk_fact_transaction_currency FOREIGN KEY (currency_id_sk)
        REFERENCES dim_currency(currency_id_sk),
    CONSTRAINT fk_fact_transaction_type FOREIGN KEY (tx_type_id_sk)
        REFERENCES dim_transaction_type(tx_type_id_sk)
);

-- Fact Allocation
CREATE TABLE fact_allocation (
    allocation_id BIGSERIAL PRIMARY KEY,
    transaction_id BIGINT NOT NULL,
    fund_id_sk INT NOT NULL,
    deal_id_sk INT NOT NULL,
    investor_id_sk INT NOT NULL,
    trans_amount NUMERIC(18,2) NOT NULL,
    alloc_percent NUMERIC(5,2) NOT NULL,
    trans_date DATE NOT NULL,
    load_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_fact_allocation_transaction FOREIGN KEY (transaction_id)
        REFERENCES fact_transaction(transaction_id),
    CONSTRAINT fk_fact_allocation_fund FOREIGN KEY (fund_id_sk)
        REFERENCES dim_fund(fund_id_sk),
    CONSTRAINT fk_fact_allocation_deal FOREIGN KEY (deal_id_sk)
        REFERENCES dim_deal(deal_id_sk),
    CONSTRAINT fk_fact_allocation_investor FOREIGN KEY (investor_id_sk)
        REFERENCES dim_investor(investor_id_sk)
);

-- Fact Commitment
CREATE TABLE fact_commitment (
    commitment_id BIGSERIAL PRIMARY KEY,
    fund_id_sk INT NOT NULL,
    investor_id_sk INT NOT NULL,
    commitment_amount NUMERIC(18,2) NOT NULL,
    commitment_date DATE NOT NULL,
    load_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_fact_commitment_fund FOREIGN KEY (fund_id_sk)
        REFERENCES dim_fund(fund_id_sk),
    CONSTRAINT fk_fact_commitment_investor FOREIGN KEY (investor_id_sk)
        REFERENCES dim_investor(investor_id_sk)
);
