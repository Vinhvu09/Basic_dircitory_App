const express = require("express");
const router = express.Router();
const userController = require("../controllers/login.controller");

router.post("/signup", userController.creatUser);

module.exports = router;
