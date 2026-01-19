const pool = require("../../data/db");

const getInvestorController = async (req, res) => {
  try {
    const result = await pool.query(`
              select
                  *
              from 
                  subledger_cz.dim_investor
              `);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
};

const createInvestorController = async (req, res) => {
  try {
    const { investorName, createdDate } = req.body;
    await pool.query(
      `
      INSERT INTO subledger_cz.dim_investor (investor_name, investor_created_date)
      VALUES ($1, $2)
    `,
      [investorName, createdDate]
    );
    res.status(201).send(`${investorName} successfully created`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
};

const updateInvestorController = async (req, res) => {
  try {
    // Request must include a body
    if (req.body == undefined) {
      return res.status(400).send("Must send body with this request");
    }

    const { investorId } = req.params;

    const { investorName, createdDate } = req.body;

    // Investor ID must be defined
    if (investorId == undefined) {
      return res.status(400).send("Must enter a investor ID to make an update");
    }

    // Check to see if the investor exists, if not return an error
    const investorExists = await pool.query(
      `
            SELECT 1 from subledger_cz.dim_investor
            WHERE investor_id_sk = $1
        `,
      [investorId]
    );

    if (investorExists.rows.length === 0) {
      return res.status(404).send("Investor not found");
    }

    // Build dynamic query based on provided fields
    const updateFields = [];
    const values = [];
    let paramCount = 1;

    if (investorName !== undefined) {
      updateFields.push(`investor_name = $${paramCount}`);
      values.push(investorName);
      paramCount++;
    }

    if (createdDate !== undefined) {
      updateFields.push(`investor_created_date = $${paramCount}`);
      values.push(createdDate);
      paramCount++;
    }

    // If no fields to update, return error
    if (updateFields.length === 0) {
      return res
        .status(400)
        .send("At least one field (investorName or createdDate) is required");
    }

    // Add investorId as the WHERE clause parameter
    values.push(investorId);
    const whereParam = `$${paramCount}`;

    const query = `
      UPDATE subledger_cz.dim_investor
      SET ${updateFields.join(", ")}
      WHERE investor_id_sk = ${whereParam}
    `;

    await pool.query(query, values);
    res.status(200).send("Investor successfully updated");
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
};

const deleteInvestorController = async (req, res) => {
  try {
    const { investorId } = req.params;

    // Fund ID must be defined
    if (investorId == undefined) {
      return res.status(400).send("Must enter a investor ID to make an update");
    }

    // Check to see if the investor exists, if not return an error
    const investorExists = await pool.query(
      `
            SELECT 1 from subledger_cz.dim_investor
            WHERE investor_id_sk = $1
        `,
      [investorId]
    );

    if (investorExists.rows.length === 0) {
      return res.status(404).send("Investor not found");
    }

    await pool.query(
      `
        DELETE FROM subledger_cz.dim_investor
        WHERE investor_id_sk = $1
      `,
      [investorId]
    );

    res.status(200).send("Investor successfully deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
};

module.exports = {
  getInvestorController,
  createInvestorController,
  updateInvestorController,
  deleteInvestorController,
};
