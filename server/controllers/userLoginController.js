const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken }  = require('./middleware/tokenUtil')

exports.userLoginController = (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password) return res.status(404).json({message: 'Both fields  are required'})

  userModel.findUserByEmail({ email: email }, (err, user) => {

    if (err) return res.send(err);

    if (!user) return res.status(404).json({ message: `username/password combination doesn't exist` });

    if (!bcrypt.compareSync(password, user.password)) return res.status(404).json({ message: `username/password combination doesn't exist` });

    delete user._doc.password
    
    return res.status(200).json({...user._doc, token: generateToken(user.id)});
  });
};
