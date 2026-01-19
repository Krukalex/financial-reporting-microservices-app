const pool = require("../../data/db");

const getFundController = async (req, res) => {
  try {
    const result = await pool.query(`
      select
          *
      from 
          subledger_cz.dim_fund
      `);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
};

const createFundController = async (req, res) => {
  try {
    const { fundName, createdDate } = req.body;
    await pool.query(
      `
      INSERT INTO subledger_cz.dim_fund (fund_name, fund_created_date)
      VALUES ($1, $2)
    `,
      [fundName, createdDate]
    );
    res.status(201).send(`${fundName} successfully created`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
};

const updateFundController = async (req, res) => {
  try {
    // Request must include a body
    if (req.body == undefined) {
      return res.status(400).send("Must send body with this request");
    }

    const { fundId } = req.params;

    const { fundName, createdDate } = req.body;

    // Fund ID must be defined
    if (fundId == undefined) {
      return res.status(400).send("Must enter a fund ID to make an update");
    }

    // Check to see if the fund exists, if not return an error
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

    // Add fundId as the WHERE clause parameter
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

const deleteFundController = async (req, res) => {
  try {
    const { fundId } = req.params;

    // Fund ID must be defined
    if (fundId == undefined) {
      return res.status(400).send("Must enter a fund ID to make an update");
    }

    // Check to see if the fund exists, if not return an error
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

    await pool.query(
      `
        DELETE FROM subledger_cz.dim_fund
        WHERE fund_id_sk = $1
      `,
      [fundId]
    );

    res.status(200).send("Fund successfully deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
};

module.exports = {
  getFundController,
  createFundController,
  updateFundController,
  deleteFundController,
};
