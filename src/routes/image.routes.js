const express = require("express");
const router = express.Router();
const imageController = require("../controllers/image.controller");

router.post("/upload", imageController.upload, imageController.uploadImage);

router.get("/upload", imageController.getAllImage);

router.delete("/delete/:id", imageController.deleteIdImage);

module.exports = router;
