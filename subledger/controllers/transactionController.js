const pool = require("../data/db");

const getTransactionController = async (req, res) => {
  try {
    const result = await pool.query(`
              select
                  *
              from 
                  subledger_cz.fact_transaction
              `);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
};

const createTransactionController = async (req, res) => {
  try {
    // Request must include a body
    if (req.body == undefined) {
      return res.status(400).send("Must send body with this request");
    }
    const { fundId, dealId, currencyId, txTypeId, amount, date } = req.body;

    //Make sure the transaction is not missing any mandatory fields
    const mandatoryFields = [
      "fundId",
      "dealId",
      "currencyId",
      "txTypeId",
      "amount",
      "date",
    ];

    const missingFields = mandatoryFields.filter(
      (field) => req.body[field] === undefined
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    //Insert the new transaction
    await pool.query(
      `
      INSERT INTO subledger_cz.fact_transaction (
        fund_id_sk, 
        deal_id_sk, 
        currency_id_sk, 
        tx_type_id_sk, 
        trans_amount, 
        trans_date)
      VALUES ($1, $2, $3, $4, $5, $6)
    `,
      [fundId, dealId, currencyId, txTypeId, amount, date]
    );
    res.status(201).send("Transaction successfully created");
  } catch (err) {
    console.log(err);
    res.status(500).send(`Database error: ${err}`);
  }
};

const updateTransactionController = async (req, res) => {
  try {
    // Request must include a body
    if (req.body == undefined) {
      return res.status(400).send("Must send body with this request");
    }

    const { fundId, fundName, createdDate } = req.body;

    // Fund ID must be defined
    if (fundId == undefined) {
      return res.status(400).send("Must enter a fund ID to make an update");
    }

    // Check to see if the deal exists, if not return an error
    const fundExists = await pool.query(
      `
            SELECT 1 from subledger_cz.dim_fund
            WHERE fund_id_sk = $1
        `,
      [fundId]
    );

    if (fundExists.rows.length === 0) {
      return res.status(404).send("Fund not found");
    }

    // Build dynamic query based on provided fields
    const updateFields = [];
    const values = [];
    let paramCount = 1;

    if (fundName !== undefined) {
      updateFields.push(`fund_name = $${paramCount}`);
      values.push(fundName);
      paramCount++;
    }

    if (createdDate !== undefined) {
      updateFields.push(`fund_created_date = $${paramCount}`);
      values.push(createdDate);
      paramCount++;
    }

    // If no fields to update, return error
    if (updateFields.length === 0) {
      return res
        .status(400)
        .send("At least one field (fundName or createdDate) is required");
    }

    // Add transaction as the WHERE clause parameter
    values.push(fundId);
    const whereParam = `$${paramCount}`;

    const query = `
      UPDATE subledger_cz.dim_fund
      SET ${updateFields.join(", ")}
      WHERE fund_id_sk = ${whereParam}
    `;

    await pool.query(query, values);
    res.status(200).send("Fund successfully updated");
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
};

const deleteTransactionController = async (req, res) => {
  try {
    // Request must include a body
    if (req.body == undefined) {
      return res.status(400).send("Must send body with this request");
    }

    const { transactionId } = req.body;

    // Transaction ID must be defined
    if (transactionId == undefined) {
      return res
        .status(400)
        .send("Must enter a transaction ID to make an update");
    }

    // Check to see if the transaction exists, if not return an error
    const transExists = await pool.query(
      `
            SELECT 1 from subledger_cz.fact_transaction
            WHERE transaction_id = $1
        `,
      [transactionId]
    );

    if (transExists.rows.length === 0) {
      return res.status(404).send("Transaction not found");
    }

    await pool.query(
      `
        DELETE FROM subledger_cz.fact_transaction
        WHERE transaction_id = $1
      `,
      [transactionId]
    );

    res.status(200).send("Transaction successfully deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
};

module.exports = {
  getTransactionController,
  createTransactionController,
  updateTransactionController,
  deleteTransactionController,
};
