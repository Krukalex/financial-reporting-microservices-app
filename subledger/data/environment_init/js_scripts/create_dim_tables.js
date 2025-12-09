const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

async function createDimTables() {
  const filePath = path.join(__dirname, "../sql_scripts/create_dim_tables.sql");
  // Read SQL file
  const sql = fs.readFileSync(filePath, "utf8");

  // Create PG client
  const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "mysecurepassword",
    database: "subledger",
    port: 6543,
  });

  try {
    await client.connect();
    await client.query("SET search_path TO subledger_cz");

    console.log(`Executing SQL from: ${filePath}`);
    await client.query(sql);

    console.log("SQL execution completed successfully.");
  } catch (err) {
    console.error("Error executing SQL:", err);
  } finally {
    await client.end();
  }
}

createDimTables();
