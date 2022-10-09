const userModel = require("../models/userModel.js");
const { handleRegistrationError } = require("../uitls/utils.js");

exports.userRegitrationController = (req, res, next) => {
    userModel.createAndSaveUser(req.body, (err, newUser) => {
    if(err) return handleRegistrationError(res, err)
    return res.status(200).send({ message: "ok", you: newUser });
});
}