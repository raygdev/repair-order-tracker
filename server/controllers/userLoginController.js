const userModel = require("../models/userModel");
const passport = require('passport')
const LocalStrategy = require('passport-local')



exports.userLoginController = (req, res, next) => {
  const { email, password } = req.body;
  userModel.findUserByEmail({ email: email }, (err, user) => {
    if (err) {
      res.send(err);
      return;
    } else if (!user) {
      res.status(404).json({message:`can't seem to find that user`});
      return;
    } else if (password !== user.password) {
      res.status(404).json({message:`username/password combination doesn't exist`});
      return;
    } else {
      res.status(200).json(user);
      return;
    }
  });
};
