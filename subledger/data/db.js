const { Pool } = require("pg");
const { pgUser, pgHost, pgDatabase, pgPassword, pgPort } = require("./keys");

// console.log(keys);

const pool = new Pool({
  user: pgUser,
  host: pgHost,
  password: pgPassword,
  database: "subledger",
  port: pgPort, // change if using port-forward
});

module.exports = pool;
