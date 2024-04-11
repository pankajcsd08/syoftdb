
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const OPTIONS = {
    issuer: "syoft:tech",
    expiresIn: "4h",
  }
  
const sign = (payload) => jwt.sign(payload, "private_key", OPTIONS)

const verify = (token) => {
    try {
      return jwt.verify(token, "private_key", OPTIONS)
    } catch (err) {
      return false
    }
  }

const authenticate = async (
    req,
    res,
    next
  ) => {
    try {
      const token = (req.get("authorization") || "").replace(/Bearer /, "")
      if(!token){
        return res.status(400).send({
          status: 0,
          message: "Token not provided",
        })
      }
      let decoded = await verify(token)
      req.user = decoded.userId
      req.role = decoded.role
      next()
    } catch (err) {
      return res.status(401).send({
        status: 0,
        message: "Unauthorized access",
      })
    }
  }

const genHash = (pwd, sr) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(pwd, sr, function (err, hash) {
        if (err) {
          reject(0)
        } else {
          resolve(hash)
        }
      })
    })
  }
  

module.exports = {
    sign,
    authenticate,
    verify,
    genHash,
  };