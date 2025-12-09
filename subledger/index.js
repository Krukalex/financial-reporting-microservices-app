const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const adminRoutes = require("./routes/admin");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.status(200).send({ message: "connected to server" });
// });

app.use("/admin", adminRoutes);

app.listen(5000, (err) => {
  console.log("listening on port 5000");
});
