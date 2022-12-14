const jwt = require('jsonwebtoken')
exports.generateToken =  function (id) {
    return jwt.sign({ id }, process.env.JWT_SECRET,{
      expiresIn: '1h'
    })
  }