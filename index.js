const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const connectDatabase = require("./src/configs/db.config");
const todoRoute = require("./src/routes/todo.routes");
const loginRoute = require("./src/routes/login.routes");
connectDatabase();

const port = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  res.send("Home Page !");
});

app.use(cookieParser());
app.use(helmet());
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", todoRoute);
app.use("/", loginRoute);

app.listen(port, () => {
  console.log(`Server is listen on port ${port}`);
});
