const express = require("express");
const pool = require("../data/db");

const router = express.Router();

router.get("/schemas", async (req, res) => {
  try {
    const result = await pool.query(` 
        SELECT schema_name
        FROM information_schema.schemata
        ORDER BY schema_name;
    `);
    res.status(200).send(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
});

router.get("/tables", async (req, res) => {
  try {
    const result = await pool.query(`
        SELECT table_schema, table_name
        FROM information_schema.tables
        WHERE table_schema = 'subledger_cz'
        AND table_type = 'BASE TABLE'
        ORDER BY table_name;
        `);
    res.status(200).send(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Database error");
  }
});

module.exports = router;
