const { default: mongoose } = require("mongoose");

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const Mess = mongoose.model("Mess", messageSchema);

module.exports = Mess;
