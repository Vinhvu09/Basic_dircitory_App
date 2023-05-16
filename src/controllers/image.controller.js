const { default: mongoose, model } = require("mongoose");
const multer = require("multer");
const Image = require("../model/image");

async function uploadImage(req, res) {
  try {
    const newImage = new Image({
      name: req.body.name,
      image: {
        date: req.file.filename,
        contentType: "image/png",
      },
    });
    await newImage.save();
    res.json(newImage);
  } catch (error) {
    if (error.code === 11000) {
      res.send("Ko tai dc");
    }
  }
}

//Storage
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("testImage");

async function getAllImage(req, res) {
  const resultImage = await Image.find();
  res.json(resultImage);
}

async function deleteIdImage(req, res) {
  await Image.findByIdAndDelete(req.params.id);
  res.json({
    message: "Image item deleted",
  });
}

module.exports = {
  uploadImage,
  upload,
  getAllImage,
  deleteIdImage,
};
