import  jwt from 'jsonwebtoken'
export const generateToken =  function (id: string) {
    return jwt.sign({ id }, process.env.JWT_SECRET!,{
      expiresIn: '1h'
    })
  }