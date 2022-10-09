const express = require("express");
const router = express.Router();

const userRegistration = require('../controllers/userRegisterController')

router.post("/api/register/user",userRegistration.userRegitrationController );

module.exports = router;
