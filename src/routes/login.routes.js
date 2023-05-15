const express = require("express");
const router = express.Router();
const userController = require("../controllers/login.controller");

router.post("/api/signup", userController.creatUser);

router.post("api/login");

module.exports = router;
