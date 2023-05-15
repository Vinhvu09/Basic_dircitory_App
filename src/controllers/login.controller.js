const { default: mongoose } = require("mongoose");
const User = require("../model/user");

async function creatUser(req, res) {
  //   try {
  //     const users = new User({
  //       email: req.body.email,
  //       password: req.body.password,
  //     });
  //     await users.save();
  //     res.json(users);
  //   } catch (error) {
  //     if ((error.code = 11000)) {
  //       res.json("User da ton tai");
  //     }
  //   }

  const users = await User.findOne({
    email: req.body.email,
  });
  if (users) {
    return res.json("User da ton tai");
  }
  const docusers = new User({
    email: req.body.email,
    password: req.body.password,
  });
  await docusers.save();
  res.json(docusers);
}

module.exports = {
  creatUser,
};
