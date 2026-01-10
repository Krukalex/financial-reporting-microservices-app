const pool = require("../data/db");

const getTransactionTypeController = async (req, res) => {
  try {
    const result = await pool.query(`
              select
                  *
              from 
                  subledger_cz.dim_transaction_type
              `);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
};

const createTransactionTypeController = async (req, res) => {
  try {
    const { txTypeName } = req.body;
    await pool.query(
      `
      INSERT INTO subledger_cz.dim_transaction_type (tx_type_name)
      VALUES ($1)
    `,
      [txTypeName]
    );
    res.status(201).send(`${txTypeName} successfully created`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
};

const updateTransactionTypeController = async (req, res) => {
  try {
    // Request must include a body
    if (req.body == undefined) {
      return res.status(400).send("Must send body with this request");
    }

    const { txTypeId, txTypeName } = req.body;

    // Transaction Type ID must be defined
    if (txTypeId == undefined) {
      return res
        .status(400)
        .send("Must enter a transaction type ID to make an update");
    }

    // Check to see if the transaction type exists, if not return an error
    const txTypeExists = await pool.query(
      `
            SELECT 1 from subledger_cz.dim_transaction_type
            WHERE tx_type_id_sk = $1
        `,
      [txTypeId]
    );

    if (txTypeExists.rows.length === 0) {
      return res.status(404).send("Transaction Type not found");
    }

    // Build dynamic query based on provided fields
    const updateFields = [];
    const values = [];
    let paramCount = 1;

    if (txTypeName !== undefined) {
      updateFields.push(`tx_type_name = $${paramCount}`);
      values.push(txTypeName);
      paramCount++;
    }

    // If no fields to update, return error
    if (updateFields.length === 0) {
      return res
        .status(400)
        .send("At least one field (txTypeName) is required");
    }

    // Add txTypeId as the WHERE clause parameter
    values.push(txTypeId);
    const whereParam = `$${paramCount}`;

    const query = `
      UPDATE subledger_cz.dim_transaction_type
      SET ${updateFields.join(", ")}
      WHERE tx_type_id_sk = ${whereParam}
    `;

    await pool.query(query, values);
    res.status(200).send("Transaction Type successfully updated");
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
};

module.exports = {
  getTransactionTypeController,
  createTransactionTypeController,
  updateTransactionTypeController,
};
