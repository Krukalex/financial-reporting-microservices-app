const express = require("express");
const pool = require("../data/db");

const router = express.Router();

router.get("/funds", async (req, res) => {
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
});

router.post("/funds", async (req, res) => {
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
});

module.exports = router;
