const pool = require("../data/db");

const getDealController = async (req, res) => {
  try {
    const result = await pool.query(`
              select
                  *
              from 
                  subledger_cz.dim_deal
              `);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
};

const createDealController = async (req, res) => {
  try {
    const { dealName, createdDate } = req.body;
    await pool.query(
      `
      INSERT INTO subledger_cz.dim_deal (deal_name, deal_created_date)
      VALUES ($1, $2)
    `,
      [dealName, createdDate]
    );
    res.status(201).send(`${dealName} successfully created`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
};

const updateDealController = async (req, res) => {
  try {
    // Request must include a body
    if (req.body == undefined) {
      return res.status(400).send("Must send body with this request");
    }

    const { dealId, dealName, createdDate } = req.body;

    // Deal ID must be defined
    if (dealId == undefined) {
      return res.status(400).send("Must enter a deal ID to make an update");
    }

    // Check to see if the deal exists, if not return an error
    const dealExists = await pool.query(
      `
            SELECT 1 from subledger_cz.dim_deal
            WHERE deal_id_sk = $1
        `,
      [dealId]
    );

    if (dealExists.rows.length === 0) {
      return res.status(404).send("Deal not found");
    }

    // Build dynamic query based on provided fields
    const updateFields = [];
    const values = [];
    let paramCount = 1;

    if (dealName !== undefined) {
      updateFields.push(`deal_name = $${paramCount}`);
      values.push(dealName);
      paramCount++;
    }

    if (createdDate !== undefined) {
      updateFields.push(`deal_created_date = $${paramCount}`);
      values.push(createdDate);
      paramCount++;
    }

    // If no fields to update, return error
    if (updateFields.length === 0) {
      return res
        .status(400)
        .send("At least one field (dealName or createdDate) is required");
    }

    // Add dealId as the WHERE clause parameter
    values.push(dealId);
    const whereParam = `$${paramCount}`;

    const query = `
      UPDATE subledger_cz.dim_deal
      SET ${updateFields.join(", ")}
      WHERE deal_id_sk = ${whereParam}
    `;

    await pool.query(query, values);
    res.status(200).send("Deal successfully updated");
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
};

const deleteDealController = async (req, res) => {
  try {
    // Request must include a body
    if (req.body == undefined) {
      return res.status(400).send("Must send body with this request");
    }

    const { dealId } = req.body;

    // Fund ID must be defined
    if (dealId == undefined) {
      return res.status(400).send("Must enter a deal ID to make an update");
    }

    // Check to see if the deal exists, if not return an error
    const dealExists = await pool.query(
      `
            SELECT 1 from subledger_cz.dim_deal
            WHERE deal_id_sk = $1
        `,
      [dealId]
    );

    if (dealExists.rows.length === 0) {
      return res.status(404).send("Deal not found");
    }

    await pool.query(
      `
        DELETE FROM subledger_cz.dim_deal
        WHERE deal_id_sk = $1
      `,
      [dealId]
    );

    res.status(200).send("Deal successfully deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
};

module.exports = {
  getDealController,
  createDealController,
  updateDealController,
  deleteDealController,
};
