
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { sign } = require('../middleware/auth');


const userLogin = async (req, res) => {

   const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send({ message: 'email and password are not provided'});
    }

    const user = await User.findOne({email: email})
    if (!user) {
        return res.status(401).send({ message: "Invalid Username or Password!"});
      }

    if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).send({  message: "Invalid Username or Password!"});
      }
    const payload = {
        userId: user._id.toHexString(),
        role: user.role,
    }
   const token = await sign(payload)
   
   res.status(200).send({
        data: { ...user,
        accessToken: token,
        }
    }
   )
   
}




module.exports = userLogin