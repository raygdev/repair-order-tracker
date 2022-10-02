const express = require("express");
const router = express.Router();

const User = require("./models/userSchema.js");
const UserSchema = User.UserSchema;
const createAndUpdateUser = User.createAndUpdateUser;

router.get("/api/register/user", (req, res, next) => {
  const user = req.body;
  createAndUpdateUser(user, (err, newUser) => {
    if (err) return res.send(err.error);
    res.send(newUser);
  });
});


module.exports = router