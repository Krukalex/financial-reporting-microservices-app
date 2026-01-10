const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const adminRoutes = require("./routes/admin");
const fundRoutes = require("./routes/fund");
const dealRoutes = require("./routes/deal");
const currencyRoutes = require("./routes/currency");
const transTypeRoutes = require("./routes/transType");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.status(200).send({ message: "connected to server" });
// });

app.use("/admin", adminRoutes);
app.use("/funds", fundRoutes);
app.use("/deals", dealRoutes);
app.use("/currency", currencyRoutes);
app.use("/tx_type", transTypeRoutes);

app.listen(5000, (err) => {
  console.log("listening on port 5000");
});
