const express = require("express");
const router = express.Router();

const { createAndSaveUser } = require("../models/userModel.js");
const { handleRegistrationError } = require("../uitls/utils.js");

router.post("/api/register/user", (req, res, next) => {
  return createAndSaveUser(req.body, (err, newUser) => {
      if(err) return handleRegistrationError(res, err)
      return res.status(200).send({ message: "ok", you: newUser });
  });
});

module.exports = router;
