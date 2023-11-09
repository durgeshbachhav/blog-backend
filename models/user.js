const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
     fullname: {
          type: String,
          required: true,
     },
     email: {
          type: String,
          required: true,
          unique: true,
     },
     password: {
          type: String,
          required: true,
     },
     avatar: {
          publicId: String,
          url: String
     },
     followers: [
          { type: String }
     ],
     followings: [
          { type: String }
     ],
     blogs: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Blog',
     }]
},
     { timestamps: true })



const User = mongoose.model('User', UserSchema)
module.exports = User;
