const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const connectDatabase = require("./src/configs/db.config");
connectDatabase();

const port = process.env.PORT || 3000;

const app = express();

app.use(helmet());

app.use(morgan("tiny"));

app.use(cors());
app.use(express.json());

app.use("/api", require("./src/routes/router"));

app.get("/", (req, res) => {
  res.json({
    message: "Hi !!",
  });
});

app.get("*", (req, res) => {
  res.json({
    message: "Hello !!",
  });
});

app.listen(port, () => {
  console.log(`Server is listen on port ${port}`);
});
