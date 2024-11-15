const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const loginController = async (req, res) => {
  try {
    let email = req.body.data.username;
    let password = req.body.data.password;
    const user = await userModel.findOne({ email: email });
    if (user === null) {
      return res.status(401).send("User not Found");
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        res
          .status(200)
          .json({ message: "Login", redirectUrl: "/", user: user });
      } else {
        res.status(400).json({ message: "Invalid Credentials" });
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

module.exports = loginController;
