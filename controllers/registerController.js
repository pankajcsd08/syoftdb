const User = require('../models/User');
const { genHash } = require('../middleware/auth');

const userRegister = async (req, res) => {
    const { email, password, username , role, gender,address } = req.body

    if(!email || !password || !username ){
        return res.status(400).send({  message:'email or username or password are not provided'});
    }

    const hash = await genHash(password, 10)
    
    const user = await User.create({
      email: email,
      password: hash,
      userName: username,
      role: role,
      gender: gender,
      address,address,
    })

    if(user){
      return res.status(200).send({  message:'user created !'}); //according to question 201 status with user created message 
    }
    return res.status(201).send({  message:'user not created !'})
}

module.exports = userRegister;

