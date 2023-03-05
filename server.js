const express = require("express");
const router = require("./routes/auth.routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/private", require("./routes/private"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to database"))
  .catch(console.error);
app.listen(5000, () => {
  console.log("port 5000");
});
