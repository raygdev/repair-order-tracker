const userModel = require("../models/userModel");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

exports.userLoginController = (req, res, next) => {
  const { email, password } = req.body;

  userModel.findUserByEmail({ email: email }, (err, user) => {
    if (err) {
      return res.send(err);
    } else if (!user) {
      return res.status(404).json({ message: `can't seem to find that user` });
    } else if (!bcrypt.compareSync(password, user.password)) {
      return res
        .status(404)
        .json({ message: `username/password combination doesn't exist` });
    } else {
      return res.status(200).json(user);
    }
  });
};
