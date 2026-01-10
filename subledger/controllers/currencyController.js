const pool = require("../data/db");

const getCurrencyController = async (req, res) => {
  try {
    const result = await pool.query(`
              select
                  *
              from 
                  subledger_cz.dim_currency
              `);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
};

const createCurrencyController = async (req, res) => {
  try {
    const { currencyName, currencyIso } = req.body;
    await pool.query(
      `
      INSERT INTO subledger_cz.dim_currency (currency_name, currency_iso)
      VALUES ($1, $2)
    `,
      [currencyName, currencyIso]
    );
    res.status(201).send(`${currencyName} successfully created`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
};

const updateCurrencyController = async (req, res) => {
  try {
    // Request must include a body
    if (req.body == undefined) {
      return res.status(400).send("Must send body with this request");
    }

    const { currencyId, currencyName, currencyIso } = req.body;

    // Currency ID must be defined
    if (currencyId == undefined) {
      return res.status(400).send("Must enter a currency ID to make an update");
    }

    // Check to see if the currency exists, if not return an error
    const currencyExists = await pool.query(
      `
            SELECT 1 from subledger_cz.dim_currency
            WHERE currency_id_sk = $1
        `,
      [currencyId]
    );

    if (currencyExists.rows.length === 0) {
      return res.status(404).send("Currency not found");
    }

    // Build dynamic query based on provided fields
    const updateFields = [];
    const values = [];
    let paramCount = 1;

    if (currencyName !== undefined) {
      updateFields.push(`currency_name = $${paramCount}`);
      values.push(currencyName);
      paramCount++;
    }

    if (currencyIso !== undefined) {
      updateFields.push(`currency_iso = $${paramCount}`);
      values.push(currencyIso);
      paramCount++;
    }

    // If no fields to update, return error
    if (updateFields.length === 0) {
      return res
        .status(400)
        .send("At least one field (currencyName or currencyIso) is required");
    }

    // Add currencyId as the WHERE clause parameter
    values.push(currencyId);
    const whereParam = `$${paramCount}`;

    const query = `
      UPDATE subledger_cz.dim_currency
      SET ${updateFields.join(", ")}
      WHERE currency_id_sk = ${whereParam}
    `;

    await pool.query(query, values);
    res.status(200).send("Currency successfully updated");
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
};

const deleteCurrencyController = async (req, res) => {
  try {
    // Request must include a body
    if (req.body == undefined) {
      return res.status(400).send("Must send body with this request");
    }

    const { currencyId } = req.body;

    // Fund ID must be defined
    if (currencyId == undefined) {
      return res.status(400).send("Must enter a currency ID to make an update");
    }

    // Check to see if the deal exists, if not return an error
    const currencyExists = await pool.query(
      `
            SELECT 1 from subledger_cz.dim_currency
            WHERE currency_id_sk_id_sk = $1
        `,
      [currencyId]
    );

    if (currencyExists.rows.length === 0) {
      return res.status(404).send("Currency not found");
    }

    await pool.query(
      `
        DELETE FROM subledger_cz.dim_currency
        WHERE currency_id_sk = $1
      `,
      [fundId]
    );

    res.status(200).send("Currency successfully deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
};

module.exports = {
  getCurrencyController,
  createCurrencyController,
  updateCurrencyController,
  deleteCurrencyController,
};
