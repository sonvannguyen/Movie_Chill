const jwt = require('jsonwebtoken');
const UserModel = require('../models/User')

const auth = async (req, res, next) => {
  try {
    const accessToken = req.headers['authorization']
    const data = jwt.verify(accessToken, process.env.JWT_SECRET)
    const {userId} = data
    const user = await UserModel.findById(userId)
    if(user){
      req.userId = userId
      next()
    }
    else {
        return res.status(401).json('Invalid token')
    }
  } catch {
    res.status(401).json('Invalid request!')
  }
}

module.exports = auth