const express = require("express");
const {connectionDatabase} = require("./database/db");
const router = require("./routes/index")
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

connectionDatabase();

app.use(express.json());

app.use("/api", router);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});