const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const connectDatabase = require("./src/configs/db.config");
const todoRoute = require("./src/routes/todo.routes");
const User = require("./src/model/user");
connectDatabase();

const port = process.env.PORT;
const app = express();
//--------------------
const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const decoded = jwt.verify(token, "zxczxczxc");

    req.user = await User.findById(decoded._id);

    console.log(decoded);
    next();
  } else {
    res.render("login");
  }
};

//Setting up View Engine
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(helmet());
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//--------------------
app.get("/", isAuthenticated, (req, res) => {
  res.render("logout", { email: req.user.email });
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    // return console.log("Register first");
    return res.redirect("/register");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.render("login", { email, message: "Incorrect" });
  }
  const token = jwt.sign({ _id: user._id }, "zxczxczxc");
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  return res.redirect("/");
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.redirect("/login");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ _id: user._id }, "zxczxczxc");
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  return res.redirect("/login");
});

//--------------------
app.use(express.static(path.join(path.resolve(), "/public")));
app.use("/", todoRoute);
//--------------------
app.listen(port, () => {
  console.log(`Server is listen on port ${port}`);
});
