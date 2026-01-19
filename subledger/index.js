const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const adminRoutes = require("./routes/admin");
const fundRoutes = require("./routes/funds/index");
const dealRoutes = require("./routes/deals/deal");
const investorRoutes = require("./routes/investors/investor");
const currencyRoutes = require("./routes/reference/currency");
const transTypeRoutes = require("./routes/reference/transType");
const transactionRoutes = require("./routes/transaction");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.status(200).send({ message: "connected to server" });
// });

app.use("/admin", adminRoutes);
app.use("/funds", fundRoutes);
app.use("/deals", dealRoutes);
app.use("/investors", investorRoutes);
app.use("/currency", currencyRoutes);
app.use("/tx_type", transTypeRoutes);
app.use("/transactions", transactionRoutes);

app.listen(5000, (err) => {
  console.log("listening on port 5000");
});
