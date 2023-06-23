const multer = require("multer");
const Image = require("../model/image");

const uploadDirect = process.cwd() + "/uploads";

// console.log(uploadDirect);

async function uploadImage(req, res) {
  try {
    const newImage = new Image({
      name: req.file.originalname,
      image: {
        data: req.file.filename,
        contentType: "image/png",
      },
    });

    await newImage.save();

    res.json({ newImage });
  } catch (error) {
    if (error.code === 11000) {
      res.send("Ko tai dc");
    }

    res.json(error);
  }
}

//Storage
const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, "/uploads");
  },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, file.originalname);
  },
});

const config = multer({
  dest: uploadDirect,
});

const upload = config.single("file");

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
