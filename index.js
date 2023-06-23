const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const connectDatabase = require("./src/configs/db.config");
const todoRoute = require("./src/routes/todo.routes");
const loginRoute = require("./src/routes/login.routes");
const imageRoute = require("./src/routes/image.routes");
const Mess = require("./src/model/message");
connectDatabase();

const port = process.env.PORT;

const app = express();

// console.log(__dirname);

//Setting up View Engine
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(helmet());
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.render("index", { name: "Some one else" });
//   // res.sendFile("index");
// });

app.get("/", (req, res) => {
  res.render("login");
  console.log(req.cookies);
});

app.post("/login", (req, res) => {
  res.cookie("toke", "iamin", {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

app.get("/success", (req, res) => {
  res.render("success");
});

app.post("/contact", async (req, res) => {
  const { name, email } = req.body;
  await Mess.create({ name, email });
  res.redirect("/success");
});

app.use(express.static(path.join(path.resolve(), "/public")));

app.use("/", todoRoute, loginRoute);
app.use("/image", imageRoute);

app.listen(port, () => {
  console.log(`Server is listen on port ${port}`);
});
