# Private Equity Accounting API – Route Overview

This document provides a high-level overview of the core API routes for a private equity accounting system. The API is organized around **business events** (economic actions that occur in the real world) rather than direct CRUD access to fact tables. Reference data (dimensions) are managed via standard CRUD routes, while fund-level economic activity is handled through purpose-built domain routes.

---

## 1. Funds (Master Data)

### `POST /funds`
Create a new fund. Stores basic fund attributes (name, vintage year, base currency, status, etc.).

### `GET /funds`
Retrieve a list of all funds.

### `PUT /funds/{fundId}`
Update fund attributes.

### `DELETE /funds/{fundId}`
Delete a fund (typically restricted to empty or inactive funds).

---

## 2. Fund Commitments

### `POST /funds/{fundId}/commitments`
Record a commitment from an investor to a fund. Creates an entry in **Fact Commitment** defining the investor’s total committed capital to the fund.

### `GET /funds/{fundId}/commitments`
Retrieve all investor commitments for a given fund.

---

## 3. Fund Economic Events (Core Accounting Actions)

These routes represent irreversible business events that create one or more accounting facts.

### `POST /funds/{fundId}/capital-calls`
Record a capital call at the fund level. Creates a fund-level transaction and allocates the called amount across investors based on their commitment percentages.

### `POST /funds/{fundId}/distributions`
Record a distribution from the fund to investors. Creates a fund-level transaction and allocates proceeds to investors (e.g., return of capital or profit).

### `POST /funds/{fundId}/fees`
Record management fees charged to the fund. Creates a fund-level expense transaction and allocates the cost across investors.

### `POST /funds/{fundId}/expenses`
Record other fund-level expenses (legal, audit, admin, broken deal costs, etc.). Creates a fund-level expense transaction and allocates it to investors.

### `POST /funds/{fundId}/investments`
Record a portfolio company investment made by the fund. Creates a deal-level transaction representing capital deployed from the fund into a deal. No investor allocations are created.

### `POST /funds/{fundId}/deals/{dealId}/exit`
Record the exit of a portfolio company. Creates deal-level exit proceeds and corresponding fund-level distribution transactions, with allocations to investors.

---

## 4. Transaction Corrections

### `POST /funds/{fundId}/transactions/{transactionId}/reverse`
Reverse a previously recorded transaction. Creates offsetting transaction and allocation entries for auditability. Financial facts are never deleted.

---

## 5. Deals (Master Data)

### `POST /deals`
Create a new deal (portfolio company) associated with a fund.

### `GET /deals`
Retrieve a list of all deals.

### `PUT /deals/{dealId}`
Update deal attributes.

### `DELETE /deals/{dealId}`
Delete a deal (typically restricted to deals with no activity).

---

## 6. Investors (Master Data)

### `POST /investors`
Create a new investor.

### `GET /investors`
Retrieve a list of all investors.

### `PUT /investors/{investorId}`
Update investor attributes.

### `DELETE /investors/{investorId}`
Delete an investor (typically restricted if commitments exist).

---

## 7. Reference Data (Administrative)

### `POST /currencies`
Create a currency reference record.

### `GET /currencies`
Retrieve the list of supported currencies.

### `PUT /currencies/{currencyId}`
Update currency attributes.

---

### `POST /transaction-types`
Create a transaction type (e.g., capital call, investment, distribution).

### `GET /transaction-types`
Retrieve the list of transaction types.

### `PUT /transaction-types/{transactionTypeId}`
Update transaction type attributes.

---

## Design Principles

- Routes represent **business events**, not database tables.
- Fund-level transactions may trigger investor-level allocations.
- Deal-level transactions represent capital deployment and realization by the fund.
- Financial facts are immutable; corrections are handled via reversal transactions.

This API design supports the core lifecycle of private equity accounting while remaining extensible for future enhancements.

