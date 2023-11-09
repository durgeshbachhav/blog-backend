const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { success, error } = require('../utility/responseWrapper')
const register = async (req, res) => {
     const { fullname, email, password } = req.body;
     try {
          if (!fullname) {
               return res.send(error(400, 'fullname is required'))
          }
          if (!email) {
               return res.send(error(400, 'email is required'))
          }
          if (!password) {
               return res.send(error(400, 'password is required'))
          }

          const user = await User.findOne({ email })
          if (user) {
               return res.send(error(404, 'user already register'))
          }
          const hashpassword = await bcrypt.hash(password, 10)
          const newUser = await User.create({
               fullname,
               email,
               password: hashpassword
          })
          await newUser.save();
          return res.send(success(200, 'user created successfully'))
     } catch (e) {
          return res.send(error(500, e.message))
     }
}
const login = async (req, res) => {
     try {
          const { email, password } = req.body;
          const user = await User.findOne({ email });
          if (!user) {
               return res.send(error(401, 'authentication failed'))
          }
          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
               return res.send(error(401, 'authentication failed'))
          }
          const token = GenerateAccessToken({ userId: user._id })
          res.cookie('jwt', token, {
               httpOnly: true,
               secure: true,
          })
          res.send(success(200, { token, userId: user._id }))
     } catch (e) {
          return res.send(error(500, e.message))
     }
}
const GenerateAccessToken = (data) => {
     try {
          const token = jwt.sign(data, process.env.ACCESS_TOKEN_KEY, {
               expiresIn: '1d'
          })
          return token;

     } catch (error) {
          console.log('error while generating access token', error);
     }
}

const logout = async (req, res) => {
     try {
          res.clearCookie('jwt', {
               httpOnly: true,
               secure: true,
          })
          res.send(success(200, 'user logout successfully'))
     } catch (e) {
          return res.send(error(500, e.message))
     }
}
module.exports = {
     register,
     login,
     logout
}